import { createContext, FC, useMemo, useReducer } from 'react';
import { AxiosError } from 'axios';
import errorStateReducer from '@/components/reducers/errorStateReducer';
import {
  ErrorActionsT,
  SimpleReactComponent
} from '@/types';

export const ErrorAdviceContext = createContext<ErrorActionsT | null>(null);

export const ErrorAdviceContextProvider: FC<SimpleReactComponent> = ({ children }) => {
  const [errorState, dispatchErrorState] = useReducer(errorStateReducer, {})

  const getErrorState = () => errorState;

  const setError = (error: AxiosError) => {
    console.log(error.status);
    dispatchErrorState({
      type: 'ERROR_STATE-open-error',
      payload: {
        status: error.status ?? 0,
      }
    });
  };

  const unsetError = () => {
    dispatchErrorState({ type: 'ERROR_STATE-close-error' });
  };

  const errorActions = useMemo<ErrorActionsT>(() => ({
    getErrorState,
    setError,
    unsetError,
  }), [errorState]);

  console.log(errorState);
  return (
    <ErrorAdviceContext.Provider value={errorActions}>
      {children}
    </ErrorAdviceContext.Provider>
  );
}
