import { Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status?: boolean;
    creationDate?: Date;
}

export type ReducedItask = Pick<Itask, 'title' | 'description' | 'status'>;

export interface ITaskSuccesResponse {
    message: string;
    task: Itask;
}