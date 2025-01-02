import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { SimpleReactComponent } from '@/types';

export const Layout: FC<SimpleReactComponent> = ({ children }) => {
  
  return (
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
  );
}
