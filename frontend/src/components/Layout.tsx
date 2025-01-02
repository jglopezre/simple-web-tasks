import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { SimpleReactComponent } from '@/types';
import { ErrorDialog } from '@/components/ErrorDialog';
import { AddTaskFormDialog } from '@/components/AddTaskFormDialog';

export const Layout: FC<SimpleReactComponent> = ({ children }) => {
  
  return (
    <>
      <ErrorDialog />
      <AddTaskFormDialog />
      <Box position="relative" width="auto" minHeight="vh">
        <Box
          width={{ base: '90', md: '2/3'}}
          mx="auto"
          px={4}
          py={8}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
