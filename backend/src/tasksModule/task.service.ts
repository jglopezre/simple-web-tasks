import { DbManager } from "@/dbManager";
import { ApiResponseDataT, ReducedItask, TaskDataForResponseT } from "@/types";
import { HttpResponseStatusCode } from "../constants";

class TaskService {
  constructor (private dbManager: DbManager) {};

  async findTasks(): Promise<ApiResponseDataT<TaskDataForResponseT[]>> {
    try {
      const tasks = await this.dbManager.getCollection();

      if(tasks.length === 0) throw new Error("No hay tareas registradas");
      return {
        status: HttpResponseStatusCode.OK,
        result: {
          message: 'Tareas devueltas con exito',
          data: tasks,
        }
      };
    } catch (error: any) {
      if (error.message === "No hay tareas registradas") {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: { message: error.message },
        };
      }
      
      console.error('Error al consultar las tareas', error);
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: 'Error Interno del servidor' },
      };
    }
  };
  
  async findOneTask(id: string): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      const task = await this.dbManager.getOneRegister(id);

      if (!task) throw new Error ('La tarea no existe en la base de datos');
      
      return {
        status: HttpResponseStatusCode.OK,
        result: {
          message: 'Tarea encontrada con éxito',
          data: task
        }
      };
    } catch (error: any) {
      if (error.message === 'La tarea no existe en la base de datos') {
        return{
          status: HttpResponseStatusCode.BAD_REQUEST,
          result: {
            message: error.message
          }
        };
      }
      console.error(error);
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: 'Error Interno del servidor', },
      };
    }
  };
  
  async createTask(data: ReducedItask): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      this.dbManager.setDocument(data);
      const task = await this.dbManager.save()

      if (!task) throw new Error('La tarea no se pudo crear');

      return {
        status: HttpResponseStatusCode.CREATED,
        result: {
          message: 'Tarea guardada con exito',
          data: task,
        }
      };
    } catch (error) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: {
          message: 'Error Interno del servidor',
        }
      };
    }
  };
  
  async deleteTask(id: string): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      const task = await this.dbManager.deleteRegister(id);

      if (!task) throw new Error('La tarea no existe en la base de datos'); 
      
      return {
        status: HttpResponseStatusCode.CREATED,
        result: {
          message: 'Registro eliminado con exito',
          data: task,
        }
      };
    } catch (error: any) {
      if (error.message === 'La tarea no existe en la base de datos') {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: { message: error.message },
        };
      }

      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: 'Error Interno del servidor' },
      };
    }
  };
  
  async updateTask (id: string, data: any): Promise<ApiResponseDataT<TaskDataForResponseT>> {
    try {
      const task = await this.dbManager.updateRegister(id, data);

      if (!task) throw new Error('La tarea no existe en la base de datos');
      
      return {
        status: HttpResponseStatusCode.CREATED,
        result: {
          message: 'Tarea Actualizada con exito',
          data: task,
        }
      };
    } catch (error: any) {
      if (error.message === 'La tarea no existe en la base de datos') {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          result: { message: error.message }
        };
      }

      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        result: { message: 'Error Interno del servidor' }
      };
    }
  };
}

export default TaskService;
