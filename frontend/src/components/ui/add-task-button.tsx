import { useAddTaskFormDisclosureContext } from '@/customHooks/useAddTaskFormDisclosureContext';
import { Icon, IconButton } from '@chakra-ui/react';
import { FC } from 'react';


export const AddTaskButton:FC = () => {
  const { openAddTaskForm } = useAddTaskFormDisclosureContext();
  return (
    <IconButton
      aria-label="add-task"
      colorPalette="green"
      size="xl"
      onClick={openAddTaskForm}
    >
      <Icon fontSize="32px">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
      </Icon>
    </IconButton>
  );
}
