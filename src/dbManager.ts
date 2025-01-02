import mongoose, { ConnectOptions } from "mongoose";
import { ITask, ReducedItask } from "./types";
import TaskModel from "./tasksModule/task.model";

export class DbManager {
  private readonly uri: string;
  private readonly connectOptions: ConnectOptions;
  private documentData: ReducedItask | null = null;

  constructor(dbUrl?: string) {
    if (!dbUrl) throw new Error ("DB_URL has not been defined on Environments Variables");

    this.uri = dbUrl;
    this.connectOptions = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    }
  }

  setDocument(document: ReducedItask) {
    this.documentData = document;
  }

  getDocument() {
    return this.documentData;
  }

  async connect() {
    await mongoose.connect(this.uri, this.connectOptions);      
  }

  async disconnect() {
    await mongoose.disconnect();
  }
  
  async save() {
    if (!this.documentData) throw new Error("DocumentData debe estar seteada antes de salvar");
    const taskToSave = new TaskModel(this.documentData);
    const taskSaved = await taskToSave.save();
    return taskSaved;
  }

  async getCollection() {
    const documents = await TaskModel.find({});
    return documents;
  }

  async getOneRegister(id: string) {
    const document = await TaskModel.findById(id);
    return document;
  }

  async deleteRegister(id: string) {
    const document = await TaskModel.findByIdAndDelete(id);
    return document;
  }

  async updateRegister(id: string, data: ITask) {
    const document = await TaskModel.findByIdAndUpdate(id, data);
    return document;
  }
}