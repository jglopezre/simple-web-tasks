import mongoose, { ConnectOptions } from "mongoose";
import { ITaskDocument, PartialReducedItask, ReducedItask, TaskDataForResponseT } from "./types";
import TaskModel from "./tasksModule/task.model";

export class DbManager {
  private readonly uri: string;
  private readonly connectOptions: ConnectOptions;
  private documentData: ReducedItask | null = null;

  constructor(dbUrl?: string, performConnection?: boolean) {
    if (!dbUrl) throw new Error ("DB_URL has not been defined on Environments Variables");

    this.uri = dbUrl;
    this.connectOptions = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    }

    if (performConnection) this.connect();
  }

  setDocument(document: ReducedItask) {
    this.documentData = document;
  }

  getDocument() {
    return this.documentData;
  }

  async connect() {
    try {
      console.log('Abriendo la conexión de MongoDB...');
      await mongoose.connect(this.uri, this.connectOptions);      
      console.log("La conexion a Mongo fue exitosa");

    } catch (error: any) {
      console.error("Conexion a Mongo no fue exitosa", error);
    }
  }

  async disconnect() {
    try {
      console.log('Cerrando la conexión de MongoDB...');
      await mongoose.disconnect();
      console.log('La desconexion a Mongo fue exitosa');
    } catch (error: any) {
      throw new Error (`Conexion a Mongo no fue exitosa ${error}`);
    }
  }
  
  async saveRegister(): Promise<TaskDataForResponseT> {
    if (!this.documentData) throw new Error("DocumentData debe estar seteada antes de salvar");
    const taskToSave = new TaskModel(this.documentData);
    const taskSaved = await taskToSave.save();

    const dataToSend = this.buildDataToSend(taskSaved);
    return dataToSend;
  }

  async getCollection(): Promise<TaskDataForResponseT[]> {
    const documents = await TaskModel.find({});

    const dataToSend = documents.map(this.buildDataToSend);
    return dataToSend;
  }

  async getOneRegister(id: string): Promise<TaskDataForResponseT | null> {
    const document = await TaskModel.findById(id);
    
    if (!document) return null;

    return this.buildDataToSend(document);
  }

  async deleteRegister(id: string): Promise<TaskDataForResponseT | null> {
    const document = await TaskModel.findByIdAndDelete(id);
    
    if (!document) return null;

    return this.buildDataToSend(document);
  }

  async updateRegister(id: string, data: PartialReducedItask): Promise<TaskDataForResponseT | null> {
    const document = await TaskModel.findByIdAndUpdate(id, data);
    if (!document) return null;

    return this.buildDataToSend(document);
  }

  private buildDataToSend(document: ITaskDocument): TaskDataForResponseT {
    const dataToSend: TaskDataForResponseT = {
      _id: document?._id ?? '',
      title: document?.title ?? '',
      description: document?.description ?? '',
      completed: document?.completed ?? false,
      creationDate: document?.creationDate ?? '',      
    };
    
    return dataToSend;
  }
}