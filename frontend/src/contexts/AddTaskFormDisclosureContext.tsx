import { FC, createContext, useMemo, useState } from 'react';
import { AddTaskFormDisclosureT, SimpleReactComponent } from '@/types';

export const AddTaskFormDisclosureContext = createContext<AddTaskFormDisclosureT | null>(null);

export const AddTaskFormDisclosureContextProvider: FC<SimpleReactComponent> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenAddTaskForm = () => isOpen;

  const openAddTaskForm = () => setIsOpen(true);

  const closeAddTaskForm = () => setIsOpen(false);

  const actions  = useMemo<AddTaskFormDisclosureT>(() => ({
    isOpenAddTaskForm,
    openAddTaskForm,
    closeAddTaskForm
  }), [isOpen]);

  return(
    <AddTaskFormDisclosureContext.Provider value={actions}>
      {children}
    </AddTaskFormDisclosureContext.Provider>

  );
}