import { DbManager } from "@/dbManager";
import { ITask, ReducedItask } from "@/types";

class TaskService {
  constructor (private dbManager: DbManager) {};

  findTasks = () => {
    const tasks = "Lista de Tareas"
    return tasks;
  };
  
  findOneTask = (id: string) => {
    const task = `Tarea numero ${id}`;
    return task;
  };
  
  createTask = async(data: ReducedItask) => {
    this.dbManager.setDocument(data);
    return await this.dbManager.save()
  };
  
  deleteTask = (id: string) => {
    const task = `Tarea numero ${id} eliminada`;
    return task;
  };
  
  updateTask = (id: string, data: any) => {
    const task = `Tarea numero ${id} actualizada con la data ${data}`;
    return task;
  };
}

export default TaskService;