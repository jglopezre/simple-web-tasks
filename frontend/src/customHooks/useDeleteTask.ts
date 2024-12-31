import { useMutation } from "@tanstack/react-query";
import { useErrorAdviceContext } from "./useErrorAdviceContext"
import { deleteTask } from "@/serverApi/taskApi";

export const useDeleteTask = () => {
  const { setError } = useErrorAdviceContext();

  const result = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: deleteTask,
    onError: setError,
  });

  return result;
}