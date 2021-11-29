import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import { useErrorHandler } from 'react-error-boundary';

import DriveList from './drive-list';
import { useCreateDrive } from '../../store';

export const Drives = () => {
  const [{ loading, error }, createDrive] = useCreateDrive();

  useErrorHandler(error);

  return (
    <Box mx="auto" w="100%" h="100%" px="6" justify="space-between" maxW="container.xl">
      <Flex justify="space-between" mt="9">
        <Heading as="h1" fontSize="2xl">
          Temporary Drives
        </Heading>
        <Button
          isLoading={loading}
          color="primary"
          variant="link"
          onClick={(e) => {
            e.preventDefault();
            createDrive();
          }}
        >
          + New Drive
        </Button>
      </Flex>
      <DriveList />
    </Box>
  );
};

export default Drives;
