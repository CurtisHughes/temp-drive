import { Box, Flex, Spinner } from '@chakra-ui/react';
import { ChakraComponent } from '@chakra-ui/system';

export type PageProps = {
  loading?: boolean;
  error?: Error;
};

export const Page: ChakraComponent<'div', PageProps> = ({ error, loading, children, ...props }) => {
  if (error) {
    return <div>{error.message}</div>;
  } else if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" thickness="4px" emptyColor="gray.200" color="primary" />
      </Flex>
    );
  } else {
    return <Box {...props}>{children}</Box>;
  }
};
