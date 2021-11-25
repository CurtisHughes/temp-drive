import { Box, Spinner } from '@chakra-ui/react';
import { ChakraComponent } from '@chakra-ui/system';

export type PageProps = {
  loading?: boolean;
  error?: Error;
};

export const Page: ChakraComponent<'div', PageProps> = ({ error, loading, children, ...props }) => {
  if (error) {
    return <div>{error.message}</div>;
  } else if (loading) {
    return <Spinner />;
  } else {
    return <Box {...props}>{children}</Box>;
  }
};
