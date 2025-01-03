import { DbManager } from "@/dbManager";
import { ReducedItask } from "@/types";
import { HttpResponseStatusCode } from "../constants";

class TaskService {
  constructor (private dbManager: DbManager) {};

  async findTasks() {
    try {
      const tasks = await this.dbManager.getCollection();

      if(tasks.length === 0) throw new Error("No hay tareas registradas");

      return { status: HttpResponseStatusCode.OK, data: tasks };

    } catch (error: any) {
      if (error.message === "No hay tareas registradas") {
        return { status: HttpResponseStatusCode.NOT_FOUND, data: { message: error.message }};
      }
      
      console.error('Error al consultar las tareas', error);
      return { status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR, data: { message: 'Error Interno del servidor' }};
    }
  };
  
  async findOneTask(id: string) {
    try {
      const task = await this.dbManager.getOneRegister(id);

      if (!task) throw new Error ('La tarea no existe en la base de datos');
      
      return {status: HttpResponseStatusCode.OK, data: task};

    } catch (error: any) {
      if (error.message === 'La tarea no existe en la base de datos') {
        return{ status: HttpResponseStatusCode.BAD_REQUEST, data: { message: error.message }};
      }
      console.error(error);
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        data: { message: 'Error Interno del servidor', },
      };
    }
  };
  
  async createTask(data: ReducedItask) {
    try {
      this.dbManager.setDocument(data);
      const task = await this.dbManager.save()

      if (!task) throw new Error('La tarea no se pudo crear');

      return {
        status: HttpResponseStatusCode.CREATED,
        data: {
          message: 'Tarea guardada con exito',
          task,
        }
      };
    } catch (error) {
      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        data: {
          message: 'Error Interno del servidor',
        }
      };
    }
  };
  
  async deleteTask(id: string) {
    try {
      const task = this.dbManager.deleteRegister(id);

      if (!task) throw new Error('La tarea no existe en la base de datos'); 
      
      return {
        status: HttpResponseStatusCode.CREATED
      };

    } catch (error: any) {
      if (error.message === 'La tarea no existe en la base de datos') {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          data: { message: error.message },
        };
      }

      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        data: { message: 'Error Interno del servidor' },
      };
    }
  };
  
  async updateTask (id: string, data: any) {
    try {
      const task = await this.dbManager.updateRegister(id, data);

      if (!task) throw new Error('La tarea no existe en la base de datos');
      
      return {
        status: HttpResponseStatusCode.CREATED,
        data: {
          message: 'Tarea Actualizada con exito',
          task,
        }
      };
    } catch (error: any) {
      if (error.message === 'La tarea no existe en la base de datos') {
        return {
          status: HttpResponseStatusCode.NOT_FOUND,
          data: { message: error.message }
        };
      }

      return {
        status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
        data: { message: 'Error Interno del servidor' }
      };
    }
  };
}

export default TaskService;