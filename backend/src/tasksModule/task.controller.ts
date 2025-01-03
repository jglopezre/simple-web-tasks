import express, { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import TaskService from '@/tasksModule/task.service';
import {
  taskHasAtLeastOneField,
  taskIdValidation,
  taskPostValidations,
  taskRejectExtraFields,
  taskUpdateValidation
} from './task.validators';
import { HttpResponseStatusCode } from '../constants';
import { PartialReducedItask, ReducedItask } from '@/types';

class TaskController {
  private taskRouter: Router;
  private taskService: TaskService;
  
  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.taskRouter = express.Router();

    this.taskRouter.get('/', async(_, res) => {
      const {status, data} = await this.taskService.findTasks();
      res.status(status).json(data);
    });
    
    this.taskRouter.get('/:id', taskIdValidation, async(req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(HttpResponseStatusCode.BAD_REQUEST).json({ errors: errors.array() });
        return
      }

      const id = req.params.id;
      const {status, data} = await this.taskService.findOneTask(id);
      res.status(status).json(data);
    });
    
    this.taskRouter.post('/', taskPostValidations.concat(taskRejectExtraFields), async(req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
      }

      const reqData: ReducedItask = req.body;
      const { status, data } = await this.taskService.createTask(reqData);
      res.status(status).json(data);
    });
    
    this.taskRouter.put('/:id', taskUpdateValidation.concat(taskIdValidation, taskRejectExtraFields, taskHasAtLeastOneField), async (req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
      }

      const id = req.params.id;
      const reqData: PartialReducedItask = req.body;
      const {status, data} = await this.taskService.updateTask(id, reqData);
      res.status(status).json(data);
    });
    
    this.taskRouter.delete('/:id', taskIdValidation, async (req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
      }

      const id = req.params.id;
      const { status, data } = await this.taskService.deleteTask(id);
      res.status(status).json(data);
    });
  }

  getTaskRouter() {
    return this.taskRouter;
  }
}

export default TaskController;