import { HttpResponseStatusCode } from "@/constants";
import { ApiResponseDataT, PartialReducedItask, TaskDataForResponseT } from "@/types";
import { taskApiResponseMessages } from "../taskApiResponseMessages";


export const mockTaskData: TaskDataForResponseT = {
  _id: '677465bc090388a7b8d6d352',
  title: 'Gurdar las naranjas',
  description: 'Guardar las naranjas en la heladera',
  completed: true,
  creationDate: '2024-12-31T21:44:28.097Z',
};

export const mockUpdateTask: PartialReducedItask = {
  title: 'Guardar las sandias',
  description: 'Guardar las sandias en la heladera',
  completed: false,
}

export const mockUpdateTaskResult: TaskDataForResponseT = {
  _id: '677465bc090388a7b8d6d352',
  title: 'Guardar las sandias',
  description: 'Guardar las sandias en la heladera',
  completed: false,
  creationDate: '2024-12-31T21:44:28.097Z',
}

export const mockTasksData: TaskDataForResponseT[] = [
  {
    _id: '65942488d5e810a97621187d',
    title: 'Comprar leche',
    description: 'Ir al supermercado a comprar leche descremada.',
    completed: false,
    creationDate: '2024-01-15T10:00:00.000Z',
  },
  {
    _id: '65942488d5e810a97621187e',
    title: 'Estudiar TypeScript',
    description: 'Repasar los conceptos de interfaces y tipos genéricos.',
    completed: true,
    creationDate: '2024-01-14T18:30:00.000Z',
  },
  {
    _id: '65942488d5e810a97621187f',
    title: 'Llamar al médico',
    description: 'Pedir turno con el cardiólogo.',
    completed: false,
    creationDate: '2024-01-16T09:00:00.000Z',
  },
  {
    _id: '65942488d5e810a976211880',
    title: 'Pagar las cuentas',
    description: 'Pagar las facturas de luz, agua e internet.',
    completed: true,
    creationDate: '2024-01-10T12:00:00.000Z',
  },
  {
    _id: '65942488d5e810a976211881',
    title: 'Hacer ejercicio',
    description: 'Ir al gimnasio o salir a correr.',
    completed: false,
    creationDate: '2024-01-17T07:00:00.000Z',
  },
  {
    _id: '65942488d5e810a976211882',
    title: 'Preparar la presentación',
    description: 'Revisar la presentación para la reunión del viernes.',
    completed: true,
    creationDate: '2024-01-12T15:00:00.000Z',
  },
];

export const mockInternalErrorTasksResponse: ApiResponseDataT<TaskDataForResponseT[]> = {
  status: HttpResponseStatusCode.INTERNAL_SERVER_ERROR,
  result: { message: taskApiResponseMessages.internalError }
}