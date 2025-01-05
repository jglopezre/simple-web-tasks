import { DbManager } from "@/dbManager";
import TaskService from "./task.service";
import { HttpResponseStatusCode } from "@/constants";
import { mockInternalErrorTasksResponse, mockTaskData, mockTasksData, mockUpdateTask, mockUpdateTaskResult } from "./testData/mockTaskData";
import { taskApiResponseMessages } from "./taskApiResponseMessages";

jest.mock('../dbManager', () => {
  return {
    DbManager: jest.fn().mockImplementation(() => ({
      saveRegister: jest.fn(),
      getCollection: jest.fn(),
      getOneRegister: jest.fn(),
      deleteRegister: jest.fn(),
      updateRegister: jest.fn(),
      setDocument: jest.fn(),
      getDocument: jest.fn(),
    })),
  };
});

describe('TaskService', () => {
  let mockDbManager: jest.Mocked<DbManager>;
  let taskService: TaskService;

  beforeEach(() => {
    mockDbManager = new DbManager() as jest.Mocked<DbManager>;
    taskService = new TaskService(mockDbManager);
  });

  it('Retornar lista de tareas correctamente', async () => {
    
    mockDbManager.getCollection.mockResolvedValue(mockTasksData);

    const result = await taskService.findTasks();

    expect(mockDbManager.getCollection).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.OK);
    expect(result.result.message).toEqual(taskApiResponseMessages.foundCollection);
    expect(result.result.data).toEqual(mockTasksData);
  });

  it('Retornar Not Found si no encuentra datos en la base de datos al solicitar lista de tareas', async () => {
    
    mockDbManager.getCollection.mockResolvedValue([]);

    const result = await taskService.findTasks();

    expect(mockDbManager.getCollection).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFoundCollection);
  });

  it('Retorna mensaje de error interno si hay problemas con la BD cuando solicita lista de tareas', async() => {
    const mockError = new Error('Database connection failure');

    mockDbManager.getCollection.mockRejectedValue(mockError);

    await expect(taskService.findTasks()).resolves.toMatchObject(mockInternalErrorTasksResponse);

    expect(mockDbManager.getCollection).toHaveBeenCalled();
  });
  
  it('Retornar tarea solicitada por ID', async() => {
    const exampleId = mockTaskData._id as string;

    mockDbManager.getOneRegister.mockResolvedValue(mockTaskData);

    const result = await taskService.findOneTask(exampleId);

    expect(mockDbManager.getOneRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.OK);
    expect(result.result.message).toEqual(taskApiResponseMessages.found);
    expect(result.result.data).toEqual(mockTaskData);
  });

  it('Retornar Not Found si el ID consultado no existe en la BD', async() => {
    const exampleId = 'AAAABBBBCCCCDDDDEEEEFFFF';

    mockDbManager.getOneRegister.mockResolvedValue(null);

    const result = await taskService.findOneTask(exampleId);

    expect(mockDbManager.getOneRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFound);
  });

  it('Retornar Not Found si el ID es un string vacio', async() => {
    const exampleId = '';

    mockDbManager.getOneRegister.mockResolvedValue(null);

    const result = await taskService.findOneTask(exampleId);

    expect(mockDbManager.getOneRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFound);
  });

  it('Retorna mensaje de error interno si hay problemas con la BD cuando solicita una tarea', async() => {
    const exampleId = mockTaskData._id as string;
    
    const mockError = new Error('Database connection failure');

    mockDbManager.getOneRegister.mockRejectedValue(mockError);

    await expect(taskService.findOneTask(exampleId)).resolves.toMatchObject(mockInternalErrorTasksResponse);

    expect(mockDbManager.getOneRegister).toHaveBeenCalled();
  });

  it('Elimina la tarea solicitada por ID', async() => {
    const exampleId = mockTaskData._id as string;

    mockDbManager.deleteRegister.mockResolvedValue(mockTaskData);

    const result = await taskService.deleteTask(exampleId);

    expect(mockDbManager.deleteRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.CREATED);
    expect(result.result.message).toEqual(taskApiResponseMessages.deleted);
    expect(result.result.data).toEqual(mockTaskData);
  });

  it('Retornar Not Found si el ID de tarea a eliminar no existe en la BD', async() => {
    const exampleId = 'AAAABBBBCCCCDDDDEEEEFFFF';

    mockDbManager.deleteRegister.mockResolvedValue(null);

    const result = await taskService.deleteTask(exampleId);

    expect(mockDbManager.deleteRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFound);
  });

  it('Retornar Not Found si la tarea a eliminar recibe ID es un string vacio', async() => {
    const exampleId = '';

    mockDbManager.deleteRegister.mockResolvedValue(null);

    const result = await taskService.deleteTask(exampleId);

    expect(mockDbManager.deleteRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFound);
  });

  it('Retorna mensaje de error interno si hay problemas con la BD cuando elimina una tarea', async() => {
    const exampleId = mockTaskData._id as string;
    
    const mockError = new Error('Database connection failure');

    mockDbManager.deleteRegister.mockRejectedValue(mockError);

    await expect(taskService.deleteTask(exampleId)).resolves.toMatchObject(mockInternalErrorTasksResponse);

    expect(mockDbManager.deleteRegister).toHaveBeenCalled();
  });

  it('Crea nueva tarea con exito', async() => {
    mockDbManager.saveRegister.mockResolvedValue(mockTaskData);

    const result = await taskService.createTask(mockTaskData);

    expect(mockDbManager.saveRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.CREATED);
    expect(result.result.message).toEqual(taskApiResponseMessages.created);
    expect(result.result.data).toEqual(mockTaskData);
  });

  it('Retorna mensaje de error interno si hay problemas con la BD cuando crea una tarea', async() => {
    const mockError = new Error('Database connection failure');

    mockDbManager.saveRegister.mockRejectedValue(mockError);

    await expect(taskService.createTask(mockTaskData)).resolves.toMatchObject(mockInternalErrorTasksResponse);

    expect(mockDbManager.saveRegister).toHaveBeenCalled();
  });

  it('Actualiza la tarea solicitada por ID', async() => {
    const exampleId = mockTaskData._id as string;

    mockDbManager.updateRegister.mockResolvedValue(mockUpdateTaskResult);

    const result = await taskService.updateTask(exampleId, mockUpdateTask);

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.CREATED);
    expect(result.result.message).toEqual(taskApiResponseMessages.updated);
    expect(result.result.data).toEqual(mockUpdateTaskResult);
  });

  it('Actualiza el campo title de la tarea solicitada por ID', async() => {
    const exampleId = mockTaskData._id as string;

    mockDbManager.updateRegister.mockResolvedValue(mockUpdateTaskResult);

    const result = await taskService.updateTask(exampleId, { title: mockUpdateTask.title });

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.CREATED);
    expect(result.result.message).toEqual(taskApiResponseMessages.updated);
    expect(result.result.data).toEqual(mockUpdateTaskResult);
  });

  it('Actualiza el campo Completed de la tarea solicitada por ID', async() => {
    const exampleId = mockTaskData._id as string;

    mockDbManager.updateRegister.mockResolvedValue(mockUpdateTaskResult);

    const result = await taskService.updateTask(exampleId, { completed: false });

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.CREATED);
    expect(result.result.message).toEqual(taskApiResponseMessages.updated);
    expect(result.result.data).toEqual(mockUpdateTaskResult);
  });

  it('Actualiza el campo Descriptionde la tarea solicitada por ID', async() => {
    const exampleId = mockTaskData._id as string;

    mockDbManager.updateRegister.mockResolvedValue(mockUpdateTaskResult);

    const result = await taskService.updateTask(exampleId, { description: mockUpdateTask.description });

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.CREATED);
    expect(result.result.message).toEqual(taskApiResponseMessages.updated);
    expect(result.result.data).toEqual(mockUpdateTaskResult);
  });


  it('Retornar Not Found si el ID de tarea a actualizar no existe en la BD', async() => {
    const exampleId = 'AAAABBBBCCCCDDDDEEEEFFFF';

    mockDbManager.updateRegister.mockResolvedValue(null);

    const result = await taskService.updateTask(exampleId, mockUpdateTask);

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFound);
  });

  it('Retornar Not Found si la tarea a actualizar recibe el ID es un string vacio', async() => {
    const exampleId = '';

    mockDbManager.updateRegister.mockResolvedValue(null);

    const result = await taskService.updateTask(exampleId, mockUpdateTask);

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.result.message).toEqual(taskApiResponseMessages.notFound);
  });

  it('Retorna mensaje de error interno si hay problemas con la BD cuando actaliza una tarea', async() => {
    const exampleId = mockTaskData._id as string;
    const mockError = new Error('Database connection failure');

    mockDbManager.updateRegister.mockRejectedValue(mockError);

    await expect(taskService.updateTask(exampleId, mockUpdateTask)).resolves.toMatchObject(mockInternalErrorTasksResponse);

    expect(mockDbManager.updateRegister).toHaveBeenCalled();
  });



});