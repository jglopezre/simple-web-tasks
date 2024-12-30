import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import TaskController from './tasksModule/task.controller';
import TaskService from './tasksModule/task.service';
import { DbManager } from './dbManager';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const dbManager = new DbManager(process.env.DB_USER, process.env.DB_PASSWORD);
dbManager.connect()
.then(() => console.log("Conexion a Mongo Atlas exitosa"))
.catch(() => console.error("Conexion a Mongo no fue exitosa"));

const taskService = new TaskService(dbManager);

const taskController = new TaskController(taskService);

/* const dbManager = new DbManager(process.env.DB_USER, process.env.DB_PASSWORD);

dbManager.connect()
.then(() => {
  dbManager.setDocument({
    title: 'Prueba 1',
    description: 'Esta es una prueba a la bd',
    status: true,
  });
  dbManager.save();
})
.catch(() => console.log("Hubo error de conexion a Mongo"))
.finally(dbManager.disconnect); */

app.get('/', (_: Request, res: Response) => {
  res.send('¡En root no tengo nada!');
});

app.use('/tasks', taskController.getTaskRouter());

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});