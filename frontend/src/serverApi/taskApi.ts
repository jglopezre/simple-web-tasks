import axios, { AxiosResponse } from 'axios';
import { ServerUrlForFetching } from './ServerUrlForFetching';
import {
  ApiReturningDataT,
  PartialRequestTaskObjectT,
  ResponseTaskObjectT,
  TaskObjectT,
  TasksCollectionT
} from '@/types';

const serverUrl = new ServerUrlForFetching('/tasks');

const tasksApi = axios.create({
  baseURL: serverUrl.fetchingUrl,
});

export const getTasks = async (): Promise<ApiReturningDataT<ResponseTaskObjectT<TasksCollectionT>>> => {
  const res = await tasksApi.get<ResponseTaskObjectT<TasksCollectionT>>(serverUrl.route);
  return {
    data: res.data,
    status: res.status,
  };
}

export const getTask = async ({ id }:{ id: string }): Promise<ApiReturningDataT<ResponseTaskObjectT<TaskObjectT>>> => {
  const res = await tasksApi.get<ResponseTaskObjectT<TaskObjectT>>(`${serverUrl.route}/${id}`);
  return {
    status: res.status,
    data: res.data,
  };
}

export const createTask = async ({ data } : {data: PartialRequestTaskObjectT}): Promise<ApiReturningDataT<ResponseTaskObjectT<TaskObjectT>>> => {
  const res = await tasksApi.post<PartialRequestTaskObjectT, AxiosResponse<ResponseTaskObjectT<TaskObjectT>>>(
    serverUrl.route,
    data,
  );

  return {
    data: res.data,
    status: res.status,
  };
}

export const updateTask = async ({ id, data }: {id: string, data: PartialRequestTaskObjectT}): Promise<ApiReturningDataT<ResponseTaskObjectT<TaskObjectT>>> => {
  const res = await tasksApi.put<PartialRequestTaskObjectT, AxiosResponse<ResponseTaskObjectT<TaskObjectT>>>(
    `${serverUrl.route}/${id}`,
    data,
  );

  return {
    data: res.data,
    status: res.status,
  };
}

export const deleteTask = async ({ id } : {id: string}): Promise<ApiReturningDataT<TaskObjectT>> => {
  const res = await tasksApi.delete<string, AxiosResponse<TaskObjectT>>(
    `${serverUrl.route}/${id}`,
  );

  return {
    data: res.data,
    status: res.status,
  };
}