import { Box, For, Stack } from "@chakra-ui/react";
import { useGetTasks } from "./customHooks";
import { TaskCard } from "./components/ui/task-card";

function App() {
  const {data} = useGetTasks();
  console.log(data);
  
  return (
    <Box maxW="2/3" mx="auto" px={4} py={8}>
      <Stack>
        <For each={data}>
          {(item) => (
            <TaskCard
              key={item._id}
              _id={item._id}
              title={item.title}
              description={item.description}
              creationDate={item.creationDate}
              status={item.status}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
  
}

export default App
