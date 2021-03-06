import { Flex, Heading, Box, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';

import { CreateDriveModalForm } from './create-drive-modal-form';
import FetchExistingDriveForm from './fetch-existing-drive-form';
import DriveList from './drive-list';

export const Drives = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box mx="auto" w="100%" h="100%" px="6" justify="space-between" maxW="container.xl">
        <Flex justify="space-between" mt="9">
          <Heading as="h1" fontSize="2xl">
            Temporary Drives
          </Heading>
          <Button
            variant="link"
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
          >
            + New Drive
          </Button>
        </Flex>
        <FetchExistingDriveForm />
        <DriveList />
      </Box>
      <CreateDriveModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Drives;
