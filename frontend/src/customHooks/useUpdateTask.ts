import { useMutation } from "@tanstack/react-query";
import { useErrorAdviceContext } from "./useErrorAdviceContext"
import { updateTask } from "@/serverApi/taskApi";

export const useUpdateTask = () => {
  const { setError } = useErrorAdviceContext();

  const result = useMutation({
    mutationKey: ['update-task'],
    mutationFn: updateTask,
    onError: setError,
  });

  return result;
}