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
  
  const dbManager = new DbManager(process.env.DB_URL, true);

  const taskModule = new TaskModule(dbManager);
  
  app.get('/', (_: Request, res: Response) => {
    res.send('<h1>Bienvenido a la API de Simple-Task-Manager</h1><p>Podes encontrar mas información <a href="https://github.com/jglopezre/simple-web-tasks" target="_blank">Acá</a></p>');
  });
  
  app.use('/api/tasks', taskModule.getController().getTaskRouter());

  process.on('SIGINT', () => dbManager.disconnect()
    .then(() => process.exit(0))
    .catch(() => process.exit(-1)),
  );
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
})();
