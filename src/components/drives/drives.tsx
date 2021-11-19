import { Flex, Heading, Box, Button, Alert, AlertIcon } from '@chakra-ui/react';

import { useCreateDrive } from '../../gateways/drives';
import DriveList from './drive-list';

export const Drives = () => {
  const [{ loading, error }, createDrive] = useCreateDrive();

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
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
    </>
  );
};

export default Drives;
