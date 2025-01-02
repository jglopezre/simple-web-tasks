import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { getTasks } from '@/serverApi/taskApi';
import { useQuery } from '@tanstack/react-query';
import { useErrorAdviceContext } from './useErrorAdviceContext';

export const useGetTasks = () => {
  const { setError, getErrorState } = useErrorAdviceContext();

  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  useEffect(() => {
    if (result.isError) setError(result.error as AxiosError);
  }, [result.isError]);

  useEffect(() => {
    if(!getErrorState().isOpen) result.refetch();
  }, [getErrorState().isOpen]);

  return result;
}
