import { ErrorActionsT, SimpleReactComponent } from "@/types";
import { createContext, FC, useMemo, useState } from "react";

export const ErrorAdviceContext = createContext<ErrorActionsT | null>(null);

export const ErrorAdviceContextProvider: FC<SimpleReactComponent> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIsError = () => isOpen;

  const setError = () => setIsOpen(true);

  const unsetError = () => setIsOpen(false);

  const errorActions = useMemo<ErrorActionsT>(() => ({
    getIsError,
    setError,
    unsetError,
  }), [isOpen]);

  return (
    <ErrorAdviceContext.Provider value={errorActions}>
      {children}
    </ErrorAdviceContext.Provider>
  );
}
