import { useContext } from 'react';
import { AddTaskFormDisclosureContext } from '@/contexts';

export const useAddTaskFormDisclosureContext = () => {
  const context = useContext(AddTaskFormDisclosureContext);

  if (!context) throw new Error ('useAddTaskFormDisclosureContext debe estar envuelto porAddTaskFormDisclosureContextProvider'); 

  return context;
}