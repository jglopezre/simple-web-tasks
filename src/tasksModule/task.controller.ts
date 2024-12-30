import TaskService from '@/tasksModule/task.service';
import express, { Request, Response, Router } from 'express';

class TaskController {
  private taskRouter: Router;
  private taskService: TaskService;
  
  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.taskRouter = express.Router();

    this.taskRouter.get('/', (_, res) => {
      res.send(this.taskService.findTasks())
    });
    
    this.taskRouter.get('/:id', (req: Request, res: Response) => {
      const id = req.params.id;
      res.send(this.taskService.findOneTask(id));
    });
    
    this.taskRouter.post('/', async(req: Request, res: Response) => {
      try {
        const result = this.taskService.createTask(req.body);
        res.status(201).json({
          message: 'Tarea guardada con exito',
          result,
        });

      } catch (error) {
        res.status(500).json({
          message: 'Error interno',
        });
      }
      res.send(this.taskService.createTask(req.body));
    });
    
    this.taskRouter.put('/:id', (req: Request, res: Response) => {
      const id = req.params.id;
      res.send(this.taskService.updateTask(id, req.body))
    });
    
    this.taskRouter.delete('/:id', (req: Request, res: Response) => {
      const id = req.params.id;
      res.send(this.taskService.deleteTask(id));
    });
  }

  getTaskRouter() {
    return this.taskRouter;
  }
}

export default TaskController;