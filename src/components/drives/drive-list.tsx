import { Flex, Heading, Stack, Box, Button, Alert, AlertIcon } from '@chakra-ui/react';

import { DriveItem } from './drive-item';
import { useDrives, useCreateDrive } from '../../gateways/drives';

export const DriveList = () => {
  const [{ loading, error }, createDrive] = useCreateDrive();
  const drives = useDrives();

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
        <Stack as="ul" my="7" gridGap="7">
          {drives.map((drive) => (
            <DriveItem key={drive.name} drive={drive} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default DriveList;
