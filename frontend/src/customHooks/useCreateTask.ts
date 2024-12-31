import { useMutation } from '@tanstack/react-query';
import { useErrorAdviceContext } from './useErrorAdviceContext';
import { createTask } from '@/serverApi/taskApi';
import { RequestTaskObjectT } from '@/types';

export const useCreateTask = () => {
  const { setError } = useErrorAdviceContext();
  
  const result = useMutation({
    mutationKey: ['create-task'],
    mutationFn: createTask,
    onError: setError,
  });

  return result;
}