import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { DbManager } from './dbManager';
import TaskModule from './tasksModule/task.module';
import swaggerDocument from './swagger.json';

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      await import('dotenv/config'); // Carga dotenv y configura process.env
      console.log("Cargando variables de entorno desde .env");
    } catch (error: any) {
      console.error("Error al cargar dotenv:", error);
    }
  } else {
    console.log("No se cargan variables de entorno desde .env (Entorno de produccion)");
  }
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  const port = process.env.PORT || 3000;
  
  const dbManager = new DbManager(process.env.DB_URL);
  dbManager.connect()
  .then(() => console.log("Conexion a Mongo Atlas exitosa"))
  .catch((error) => console.error("Conexion a Mongo no fue exitosa", error));

  const taskModule = new TaskModule(dbManager);
  
  app.get('/', (_: Request, res: Response) => {
    res.send('¡En root no tengo nada!');
  });
  
  app.use('/api/tasks', taskModule.getController().getTaskRouter());
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
})();
