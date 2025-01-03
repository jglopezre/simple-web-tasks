import { AxiosError } from 'axios';
import { ReactNode } from 'react';

export type UrlAdresses = '/tasks' | '/test';

export type ResponseTaskObjectT<T> = {
  message: string
  data: T
};

export type TaskObjectT = {
  _id: string,
  title: string,
  description: string,
  completed: boolean,
  creationDate: string,
}

export type RequestTaskObjectT = Omit<ResponseTaskObjectT, '_id' | 'creationDate'>;

export type PartialRequestTaskObjectT = Partial<RequestTaskObjectT>;

export type TasksCollectionT = TaskObjectT[];

export type SimpleReactComponent = {
  children: ReactNode,
};

export type ErrorStateT = {
  status: number,
  isOpen: boolean
  // error?: AxiosError | null,
};

export type ErrorStateReducerT = Partial<ErrorStateT>;

export type ErrorActionsT = {
  getErrorState: () => ErrorStateReducerT,
  setError: (error: AxiosError) => void,
  unsetError: () => void,
};

export type ErrorStateReducerAction = {
  type: 'ERROR_STATE-close-error' | 'ERROR_STATE-open-error',
  payload?: ErrorStateReducerT,
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

export type ApiReturningDataT<T> = {
  status?: number,
  data?: T
};

