import { Flex, For, Stack, Text } from "@chakra-ui/react";
import { useGetTasks } from "./customHooks";
import { TaskCard } from "./components/ui/task-card";
import { Layout } from "./components/Layout";
import { useAddTaskFormDisclosureContext } from "./customHooks/useAddTaskFormDisclosureContext";
import { AddTaskFormDialog } from "./components/AddTaskFormDialog";
import { AddTaskButton } from "./components/ui/add-task-button";

function App() {
  const { data } = useGetTasks();
  const { isOpenAddTaskForm } = useAddTaskFormDisclosureContext();
  console.log('Is open addtask form: ', isOpenAddTaskForm());
  
  return (
    <>
      <AddTaskFormDialog />
      <Layout>
        <Stack gap="8">
          <Flex direction="row" wrap="nowrap" justifyContent="space-between">
            <Text textStyle="4xl">Panel de Tareas</Text>
            <AddTaskButton />
          </Flex>
          <Flex wrap="wrap" gap="8" >
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
        </Stack>
      </Layout>
    </>
  );
  
}

export default App
