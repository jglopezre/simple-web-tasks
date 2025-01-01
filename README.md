


# Simple Task Manager
Simple task Manager es una pequeña aplicación para gestionar tareas pendientes, te permite crear tareas, mantener la lista e ir cerrando las tareas completadas

<img src="assets/simple-task-manager.png" alt="captura de pantalla" width="640">

## Aplicacion para probar

- [Frontend App](https://lucky-fairy-e98c1c.netlify.app/)
- [Backend Api](https://simple-web-tasks.onrender.com/api/tasks)

## ¿Cómo utilizar el front end

La app se puede correr localmente en modo desarrollador, para pruebas y modificaciones siguiendo los pasos a continuacion:

```bash
cd frontend && npm run dev
```
Con esto iniciaras Vite en modo desarrollador con *hot reload*

Si queres desplegar para producción, podés construir un build con los siguientes pasos, y luego extraer la carpeta `dist/` donde estara la aplicación compilada lista para subir al servidor o CDN.

```bash
cd frontend && npm run build
```

## Stack Utilizado

### Backend
- [Express.Js](https://expressjs.com/)
- [Swagger](https://swagger.io/tools/swagger-ui/)
- [express-validator](https://express-validator.github.io/docs)
- [Mongoose](https://mongoosejs.com/)

### Frontend
- [React](https://es.react.dev/)
- [Vite](https://vite.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axiosjs](https://axios-http.com/)
- [Chakra UI](https://www.chakra-ui.com/)

