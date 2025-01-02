import { Flex, For, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useGetTasks } from "@/customHooks";
import { TaskCard } from "@/components/ui/task-card";
import { Layout } from "@/components/Layout";
import { AddTaskFormDialog } from "@/components/AddTaskFormDialog";
import { AddTaskButton } from "@/components/ui/add-task-button";
import { emptyTaskArrayGenerator } from "@/helpers";

function App() {
  const { data: responseData, isLoading } = useGetTasks();
  
  return (
    <>
      <AddTaskFormDialog />
      <Layout>
        <Stack gap="8">
          <Flex direction="row" wrap="nowrap" justifyContent="space-between">
            <Text textStyle="4xl">Panel de Tareas</Text>
            <AddTaskButton />
          </Flex>
          <Flex 
            wrap={{ base: 'nowrap', md: 'wrap' }}
            direction={{ base: 'column', md: 'row'}}
            gap="4"
          >
            <For each={responseData?.data ?? emptyTaskArrayGenerator()}>
              {(item) => (
                <Skeleton loading={isLoading}
                  flex="1 1 calc(35% - 16px)"
                  minWidth="300px"
                >
                  <TaskCard
                    key={item._id}
                    _id={item._id}
                    title={item.title}
                    description={item.description}
                    creationDate={item.creationDate}
                    completed={item.completed}
                  />
                </Skeleton>
              )}
            </For>
          </Flex>
        </Stack>
      </Layout>
    </>
  );
  
}

export default App
