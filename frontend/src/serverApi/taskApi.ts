import axios, { AxiosResponse } from "axios";
import { ServerUrlForFetching } from "./ServerUrlForFetching";
import {
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
  return res.data;
}

export const getTask = async ({ id }:{ id: string }) => {
  const res = await tasksApi.get<ResponseTaskObjectT>(`${serverUrl.route}/${id}`);
  return res.data;
}

export const createTask = async ({ data } : {data: PartialRequestTaskObjectT}) => {
  const res = await tasksApi.post<PartialRequestTaskObjectT, AxiosResponse<ResponseTaskObjectT>>(
    serverUrl.route,
    data,
  );

  return res.data;
}

export const updateTask = async ({ id, data }: {id: string, data: PartialRequestTaskObjectT}) => {
  const res = await tasksApi.put<PartialRequestTaskObjectT, AxiosResponse<ResponseTaskObjectT>>(
    `${serverUrl.route}/${id}`,
    data,
  );

  return res.data;
}

export const deleteTask = async ({ id } : {id: string}) => {
  const res = await tasksApi.delete<string, AxiosResponse<ResponseTaskObjectT>>(
    `${serverUrl.route}/${id}`,
  );

  return res.data;
}