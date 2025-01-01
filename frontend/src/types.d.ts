import { ReactNode } from "react";

export type UrlAdresses = '/tasks';

export type ResponseTaskObjectT = {
  _id: string,
  title: string,
  description: string,
  completed: boolean,
  creationDate: string,
};

export type RequestTaskObjectT = Omit<ResponseTaskObjectT, '_id' | 'creationDate'>;

export type PartialRequestTaskObjectT = Partial<RequestTaskObjectT>;

export type TasksCollectionT = ResponseTaskObjectT[];

export type SimpleReactComponent = {
  children: ReactNode,
};

export type ErrorActionsT = {
  getIsError: () => boolean,
  setError: () => void,
  unsetError: () => void,
};

export type AddTaskFormDisclosureT = {
  isOpenAddTaskForm: () => boolean,
  openAddTaskForm: () => void,
  closeAddTaskForm: () => void,
};

export type Config = {
  apiUrl: string;
  port: string;
  isProduction: boolean;
  protocol: 'http' | 'https';
}