import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import TaskController from './tasksModule/task.controller';
import TaskService from './tasksModule/task.service';
import { DbManager } from './dbManager';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const dbManager = new DbManager(process.env.DB_URL);
dbManager.connect()
.then(() => console.log("Conexion a Mongo Atlas exitosa"))
.catch((error) => console.error("Conexion a Mongo no fue exitosa", error));

const taskService = new TaskService(dbManager);

const taskController = new TaskController(taskService);

app.get('/', (_: Request, res: Response) => {
  res.send('¡En root no tengo nada!');
});

app.use('/tasks', taskController.getTaskRouter());

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});