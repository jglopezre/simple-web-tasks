import { ExpressValidator } from "express-validator";
import { StandardValidation } from "express-validator/lib/context-items";
import { Document } from "mongoose";


export interface ITaskDocument extends Document {
  title: string,
  description: string,
  completed?: boolean,
  creationDate?: string,
}

export type ReducedItask = Pick<ITaskDocument, 'title' | 'description' | 'completed'>;

export type PartialReducedItask = Partial<ReducedItask>;

export type TaskDataForResponseT = Pick<ITaskDocument, '_id' | 'title' | 'description' | 'completed' | 'creationDate'>

/* export type ITaskSuccesResponse = {
  message: string,
  task: Itask,
} */

type ErrorExpressValidationData = {
  type: string,
  value: string,
  msg: string,
  path: string
  location: string
} 

export type ApiResponseDataT<T> = {
  status: number,
  result: {
    message: string,
    data?: T,
  },
}

export type ErrorListT = {
  errors: ErrorExpressValidationData[],
}
