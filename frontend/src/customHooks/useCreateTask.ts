import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/serverApi/taskApi';
import { useErrorAdviceContext } from './useErrorAdviceContext';
import { useAddTaskFormDisclosureContext } from './useAddTaskFormDisclosureContext';

export const useCreateTask = () => {
  const { setError } = useErrorAdviceContext();
  const { closeAddTaskForm } = useAddTaskFormDisclosureContext()

  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ['create-task'],
    mutationFn: createTask,
    onError: setError,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      closeAddTaskForm();
    },
  });

  return result;
}