import { DbManager } from "@/dbManager";
import { ApiResponseDataT, PartialReducedItask, ReducedItask, TaskDataForResponseT } from "@/types";
import { HttpResponseStatusCode } from "../constants";
import { taskApiResponseMessages } from "./taskApiResponseMessages";

class TaskService {
  constructor (private dbManager: DbManager) {};

  async findTasks(): Promise<ApiResponseDataT<TaskDataForResponseT[]>> {
    try {
      const tasks = await this.dbManager.getCollection();

      if(tasks.length === 0) {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: { message: taskApiResponseMessages.notFoundCollection },
        };
      };

      return {
        status: HttpResponseStatusCode.OK,
        result: {
          message: taskApiResponseMessages.foundCollection,
          data: tasks,
        }
      };
    } catch (error: any) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: taskApiResponseMessages.internalError },
      };
    }
  };
  
  async findOneTask(id: string): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      const task = await this.dbManager.getOneRegister(id);

      if (!task) {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: {
            message: taskApiResponseMessages.notFound
          }
        }
      };
      
      return {
        status: HttpResponseStatusCode.OK,
        result: {
          message: taskApiResponseMessages.found,
          data: task
        }
      };
    } catch (error: any) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: taskApiResponseMessages.internalError },
      };
    }
  };
  
  async createTask(data: ReducedItask): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      this.dbManager.setDocument(data);

      const task = await this.dbManager.saveRegister()

      return {
        status: HttpResponseStatusCode.CREATED,
        result: {
          message: taskApiResponseMessages.created,
          data: task,
        }
      };
    } catch (error) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: {
          message: taskApiResponseMessages.internalError,
        }
      };
    }
  };
  
  async deleteTask(id: string): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      const task = await this.dbManager.deleteRegister(id);

      if (!task) {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: { message: taskApiResponseMessages.notFound },
        };
      }; 
      
      return {
        status: HttpResponseStatusCode.CREATED,
        result: {
          message: taskApiResponseMessages.deleted,
          data: task,
        }
      };
    } catch (error: any) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: taskApiResponseMessages.internalError },
      };
    }
  };
  
  async updateTask (id: string, data: PartialReducedItask): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      const task = await this.dbManager.updateRegister(id, data);

      if (!task) {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: { message: taskApiResponseMessages.notFound}
        };
      };
      
      return {
        status: HttpResponseStatusCode.CREATED,
        result: {
          message: taskApiResponseMessages.updated,
          data: task,
        }
      };
    } catch (error: any) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: taskApiResponseMessages.internalError }
      };
    }
  };
}

export default TaskService;
