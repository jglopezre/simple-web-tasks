import { Document } from "mongoose";

export interface ITask extends Document {
    _id?: string
    title: string;
    description: string;
    completed?: boolean;
    creationDate?: Date;
}

export type ReducedItask = Pick<Itask, 'title' | 'description' | 'status'>;

export type PartialReducedItask = Partial<ReducedItask>;

export interface ITaskSuccesResponse {
    message: string;
    task: Itask;
}