import { Flex, For } from "@chakra-ui/react";
import { useGetTasks } from "./customHooks";
import { TaskCard } from "./components/ui/task-card";
import { Layout } from "./components/Layout";
import { useAddTaskFormDisclosureContext } from "./customHooks/useAddTaskFormDisclosureContext";
import { AddTaskFormDialog } from "./components/AddTaskFormDialog";

function App() {
  const { data } = useGetTasks();
  const { isOpenAddTaskForm } = useAddTaskFormDisclosureContext();
  console.log('Is open addtask form: ', isOpenAddTaskForm());
  
  return (
    <>
      <AddTaskFormDialog />
      <Layout>
        <Flex wrap="wrap-reverse" gap="8" >
          <For each={data}>
            {(item) => (
              <TaskCard
                key={item._id}
                _id={item._id}
                title={item.title}
                description={item.description}
                creationDate={item.creationDate}
                completed={item.completed}
              />
            )}
          </For>
        </Flex>
      </Layout>
    </>
  );
  
}

export default App
