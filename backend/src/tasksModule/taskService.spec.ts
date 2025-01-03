import { DbManager } from "@/dbManager";
import TaskService from "./task.service";
import { mockTasks } from "./testData/mockTaskData";
import { HttpResponseStatusCode } from "@/constants";

jest.mock('@/dbManager');

describe('TaskService', () => {
  let mockDbManager: jest.Mocked<DbManager>;
  let taskService: TaskService;

  beforeEach(() => {
    mockDbManager = {
      getCollection: jest.fn(),
      setDocument: jest.fn(),
      getDocument: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      updateRegister: jest.fn(),
    } as unknown as jest.Mocked<DbManager>;
    taskService = new TaskService(mockDbManager);
  });

  it('debería retornar las tareas correctamente', async () => {
    
    mockDbManager.getCollection.mockResolvedValue(mockTasks);

    const result = await taskService.findTasks();

    expect(mockDbManager.getCollection).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.OK);
    expect(result.data).toEqual(mockTasks);
  });

  it('debería retornar un error si no hay tareas', async () => {
    mockDbManager.getCollection.mockResolvedValue([]);

    const result = await taskService.findTasks();

    expect(mockDbManager.getCollection).toHaveBeenCalled();
    expect(result.status).toBe(HttpResponseStatusCode.NOT_FOUND);
    expect(result.data.message).toBe("No hay tareas registradas");
  });

});