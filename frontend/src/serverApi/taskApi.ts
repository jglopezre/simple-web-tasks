import axios, { AxiosResponse } from "axios";
import { ServerUrlForFetching } from "./ServerUrlForFetching";
import {
  ApiReturningDataT,
  PartialRequestTaskObjectT,
  ResponseTaskObjectT,
  TasksCollectionT
} from "@/types";




const serverUrl = new ServerUrlForFetching('/tasks');

const tasksApi = axios.create({
  baseURL: serverUrl.fetchingUrl,
});

export const getTasks = async () => {
  const res = await tasksApi.get<TasksCollectionT>(serverUrl.route);
  return {
    data: res.data,
    status: res.status
  };
}

export const getTask = async ({ id }:{ id: string }): Promise<ApiReturningDataT<ResponseTaskObjectT>> => {
  const res = await tasksApi.get<ResponseTaskObjectT>(`${serverUrl.route}/${id}`);
  return {
    data: res.data,
    status: res.status
  };
}

export const createTask = async ({ data } : {data: PartialRequestTaskObjectT}): Promise<ApiReturningDataT<ResponseTaskObjectT>> => {
  const res = await tasksApi.post<PartialRequestTaskObjectT, AxiosResponse<ResponseTaskObjectT>>(
    serverUrl.route,
    data,
  );

  return {
    data: res.data,
    status: res.status
  };
}

export const updateTask = async ({ id, data }: {id: string, data: PartialRequestTaskObjectT}): Promise<ApiReturningDataT<ResponseTaskObjectT>> => {
  const res = await tasksApi.put<PartialRequestTaskObjectT, AxiosResponse<ResponseTaskObjectT>>(
    `${serverUrl.route}/${id}`,
    data,
  );

  return {
    data: res.data,
    status: res.status
  };
}

export const deleteTask = async ({ id } : {id: string}): Promise<ApiReturningDataT<ResponseTaskObjectT>> => {
  const res = await tasksApi.delete<string, AxiosResponse<ResponseTaskObjectT>>(
    `${serverUrl.route}/${id}`,
  );

  return {
    data: res.data,
    status: res.status
  };
}