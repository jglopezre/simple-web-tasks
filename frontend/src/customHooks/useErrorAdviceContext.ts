import { useContext } from 'react';
import { ErrorAdviceContext } from '@/contexts/ErrorAdviceContext';

export const useErrorAdviceContext = () => {
  const context = useContext(ErrorAdviceContext);

  if (!context) throw new Error('ErrorAdviceContext have to be wrapped by ErrorAdviceContextProvider');

  return context;
}
