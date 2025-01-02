import { ResponseTaskObjectT } from '@/types';

const emptyTask: ResponseTaskObjectT = {
  _id: '',
  title: '',
  description: '',
  completed: false,
  creationDate: '',
} 

export const emptyTaskArrayGenerator = () => {
  const max = 6;
  const min = 2;
  const emptyTasks: ResponseTaskObjectT[] = []; 
  const quantityToGenerate = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let index = 0; index < quantityToGenerate; index++) {
    emptyTasks.push(emptyTask);
  }

  return emptyTasks;
};