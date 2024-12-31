import { DbManager } from "@/dbManager";
import { ReducedItask } from "@/types";

class TaskService {
  constructor (private dbManager: DbManager) {};

  async findTasks() {
    try {
      const tasks = await this.dbManager.getCollection();

      if(tasks.length === 0) throw new Error("No hay tareas registradas");

      return tasks;

    } catch (error) {
      throw error;
    }
  };
  
  async findOneTask(id: string) {
    try {
      const task = await this.dbManager.getOneRegister(id);

      if (!task) throw new Error ('La tarea no existe en la base de datos');
      
      return task;

    } catch (error) {
      throw error;
    }
  };
  
  async createTask(data: ReducedItask) {
    try {
      this.dbManager.setDocument(data);
      const task = await this.dbManager.save()

      if (!task) throw new Error('La tarea no se pudo crear');

      return task;

    } catch (error) {
      throw error;
    }
  };
  
  async deleteTask(id: string) {
    try {
      const task = this.dbManager.deleteRegister(id);

      if (!task) throw new Error('La tarea no existe en la base de datos'); 
      
      return task;

    } catch (error) {
      throw error;
    }
  };
  
  async updateTask (id: string, data: any) {
    try {
      const task = await this.dbManager.updateRegister(id, data);

      if (!task) throw new Error('La tarea no existe en la base de datos')
      return task;

    } catch (error) {
      throw error;
    }

  };
}

export default TaskService;