import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorAdviceContext } from './useErrorAdviceContext';
import { updateTask } from '@/serverApi/taskApi';

export const useUpdateTask = () => {
  const { setError } = useErrorAdviceContext();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ['update-task'],
    mutationFn: updateTask,
    onError: (error) => setError(error as AxiosError),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return result;
}