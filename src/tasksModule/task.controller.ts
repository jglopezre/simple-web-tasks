import TaskService from '@/tasksModule/task.service';
import { ReducedItask } from '@/types';
import express, { Request, Response, Router } from 'express';

class TaskController {
  private taskRouter: Router;
  private taskService: TaskService;
  
  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.taskRouter = express.Router();

    this.taskRouter.get('/', async(_, res) => {
      try {
        const result = await this.taskService.findTasks();
        res.status(200).json(result);

      } catch (error: any) {
        if (error.message === "No hay tareas registradas") {
          res.status(404).json({ message: error.message });
          return;
        }
        console.error('Error al consultar las tareas', error);
        res.status(500).json({
          message: 'Error Interno del servidor',
        });
      }
    });
    
    this.taskRouter.get('/:id', async(req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const result = await this.taskService.findOneTask(id);
        res.status(200).json(result);

      } catch (error: any) {
        if (error.message === 'La tarea no existe en la base de datos') {
          res.status(404).json({ message: error.message });
          return;
        }
        console.error(error);
        res.status(500).json({
          message: 'Error Interno',
        });
      }
    });
    
    this.taskRouter.post('/', async(req: Request, res: Response) => {
      const data: ReducedItask = req.body;
      try {
        const result = await this.taskService.createTask(data);
        res.status(201).json({
          message: 'Tarea guardada con exito',
          result,
        });
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: 'Error Interno del servidor',
        });
      }
    });
    
    this.taskRouter.put('/:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      const data: ReducedItask = req.body;
      try {
        const result = await this.taskService.updateTask(id, data);
        res.status(201).json({
          message: 'Tarea Actualizada con exito',
          result,
        });

      } catch (error: any) {
        if (error.message === 'La tarea no existe en la base de datos') {
          res.status(404).json({ message: error.message });
          return;
        }
        res.status(500).json({
          message: 'Error Interno del servidor',
        });
      }
    });
    
    this.taskRouter.delete('/:id', async (req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const result = await this.taskService.deleteTask(id);
        res.status(201).json({
          mesage: 'Tarea eliminada con exito',
          result,
        });
      } catch (error: any) {
        if (error.message === 'La tarea no existe en la base de datos') {
          res.status(404).json({ message: error.message });
          return;
        }
        res.status(500).json({
          message: 'Error Interno del servidor',
        });
      }
    });
  }

  getTaskRouter() {
    return this.taskRouter;
  }
}

export default TaskController;