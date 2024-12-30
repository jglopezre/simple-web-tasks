import mongoose, { ConnectOptions } from "mongoose";
import { ReducedItask } from "./types";
import TaskModel from "./tasksModule/task.model";

export class DbManager {
  private readonly uri: string;
  private readonly connectOptions: ConnectOptions;
  private documentData: ReducedItask | null = null;

  constructor(dbUsername?: string, dbPassWord?: string) {
    if (!dbUsername || !dbPassWord) throw new Error ("DATABASE_URL has not been defined on Environments Variables");

    this.uri = `mongodb+srv://${dbUsername}:${dbPassWord}@testscluster1.8lg7k.mongodb.net/?retryWrites=true&w=majority&appName=TestsCluster1`;
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
    await mongoose.connect(this.uri);      
  }

  async disconnect() {
    await mongoose.disconnect();
  }
  
  async save() {
    if (!this.documentData) throw new Error("DocumentData must have been setted before saving");
    const taskToSave = new TaskModel(this.documentData);
    const taskSaved = await taskToSave.save();
    return taskSaved;
  }
}