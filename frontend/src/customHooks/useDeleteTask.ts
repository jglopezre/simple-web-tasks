import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorAdviceContext } from './useErrorAdviceContext';
import { deleteTask } from '@/serverApi/taskApi';
import { AxiosError } from 'axios';

export const useDeleteTask = () => {
  const { setError } = useErrorAdviceContext();

  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: deleteTask,
    onError: (error) => setError(error as AxiosError),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return result;
}