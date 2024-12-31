import { getTasks } from "@/serverApi/taskApi";
import { useQuery } from "@tanstack/react-query"
import { useErrorAdviceContext } from "./useErrorAdviceContext";

export const useGetTasks = () => {
  const { setError } = useErrorAdviceContext();
  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  if (result.isError) setError();

  return result;
}
