import { ErrorAdviceContext } from "@/contexts/ErrorAdviceContext"
import { useContext } from "react"

export const useErrorAdviceContext = () => {
  const context = useContext(ErrorAdviceContext);

  if (!context) throw new Error('ErrorAdviceContext have to be wrapped by ErrorAdviceContextProvider');

  return context;
}
