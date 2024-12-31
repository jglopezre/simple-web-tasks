import { useErrorAdviceContext, useGetTasks } from "./customHooks";

function App() {
  const { getIsError } = useErrorAdviceContext();
  console.log('es error', getIsError());

  const {data} = useGetTasks();
  console.log(data);
  
  return (
    <h1>Hola de nuevo</h1>
  );
  
}

export default App
