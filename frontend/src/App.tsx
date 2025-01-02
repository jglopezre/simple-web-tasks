import { Flex, For, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useGetTasks } from '@/customHooks';
import { TaskCard } from '@/components/ui/task-card';
import { Layout } from '@/components/Layout';
import { AddTaskButton } from '@/components/ui/add-task-button';
import { emptyTaskArrayGenerator } from '@/helpers';
import { ulid } from 'ulid';
import { TasksCollectionT } from './types';

function App() {
  const { data: responseData, isLoading, isError } = useGetTasks();

  const sortData = (data?: TasksCollectionT) => {
    if (!data) return emptyTaskArrayGenerator()
    return data.sort((a, b) => ((new Date(b.creationDate) as any) - (new Date(a.creationDate) as any)));
  }
  
  return (
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
          <For each={sortData(responseData?.data)}>
            {(item) => (
              <Skeleton loading={isLoading || isError}
                flex="1 1 calc(35% - 16px)"
                minWidth="300px"
                key={ulid()}
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
  );
}

export default App;
