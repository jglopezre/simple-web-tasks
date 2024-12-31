import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { AddTaskButton } from '@/components/ui/add-task-button';
import { SimpleReactComponent } from '@/types';

export const Layout: FC<SimpleReactComponent> = ({ children }) => {
  
  return (
    <Box position="relative" width="auto" height="vh">
      <Box
        maxW="2/3"
        mx="auto"
        px={4}
        py={8}
      >
        {children}
      </Box>
      <Box
        position="absolute"
        bottom="40px"
        right="40px"
      >
        <AddTaskButton />
      </Box>
    </Box>
  );
}
