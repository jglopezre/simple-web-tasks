import express, { Request, Response, Router } from 'express';
import TaskService from '@/tasksModule/task.service';
import { ReducedItask } from '@/types';
import { taskHasAtLeastOneField, taskIdValidation, taskPostValidations, taskRejectExtraFields, taskUpdateValidation } from './task.validators';
import { validationResult } from 'express-validator';


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
    
    this.taskRouter.get('/:id', taskIdValidation, async(req: Request, res: Response) => {
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
    
    this.taskRouter.post(
      '/',
      taskPostValidations.concat(taskRejectExtraFields), 
      async(req: Request, res: Response
    ) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
      }

      const data: ReducedItask = req.body;

      try {
        const result = await this.taskService.createTask(data);
        res.status(200).json({
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
    
    this.taskRouter.put(
      '/:id',
      taskUpdateValidation.concat(taskIdValidation, taskRejectExtraFields, taskHasAtLeastOneField),
      async (req: Request, res: Response  
    ) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
      }

      const id = req.params.id;
      const data: ReducedItask = req.body;
      try {
        const result = await this.taskService.updateTask(id, data);
        res.status(200).json({
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
    
    this.taskRouter.delete('/:id', taskIdValidation, async (req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
      }

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