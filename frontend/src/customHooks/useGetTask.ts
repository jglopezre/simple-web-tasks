import { useMutation } from '@tanstack/react-query';
import { useErrorAdviceContext } from './useErrorAdviceContext';
import { getTask } from '@/serverApi/taskApi';

export const useGetTask = () => {
  const { setError } = useErrorAdviceContext();

  const result = useMutation({
    mutationKey: ['task'],
    mutationFn: getTask,
    onError: setError,
  })

  return result;
}
