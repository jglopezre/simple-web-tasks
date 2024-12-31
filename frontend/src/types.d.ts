import { ReactNode } from "react";

export type UrlAdresses = '/tasks';

export type ResponseTaskObjectT = {
    _id: string,
    title: string,
    description: string,
    status: boolean,
    creationDate: string,
};

export type RequestTaskObjectT = Omit<ResponseTaskObjectT, '_id' | 'creationDate'>;

export type PartialRequestTaskObjectT = Partial<RequestTaskObjectT>;

export type TasksCollectionT = ResponseTaskObjectT[];

export type SimpleReactComponent = {
    children: ReactNode,
};

export type ErrorActionsT = {
    getIsError: () => void,
    setError: () => void,
    unsetError: () => void,
};