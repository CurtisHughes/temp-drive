import { Heading, Box, Link, Button, Text, Stack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { formatDriveTimeLeft, useDriveByName } from '../../store';
import FileItem from './file-item';

export const Files = () => {
  let { driveName } = useParams<{ driveName: string }>();
  const { value: drive, loading, error } = useDriveByName(driveName);

  useErrorHandler(error);

  return (
    <Box mx="auto" w="100%" h="100%" px="6" justify="space-between" maxW="container.xl">
      <Link as={ReactRouterLink} to="/drives" color="white">
        <Button mt="6" variant="link" color="black" leftIcon={<ArrowBackIcon />}>
          All Drives
        </Button>
      </Link>
      <Box mt="9">
        <Heading as="h1" fontSize="2xl">
          {drive?.name}
        </Heading>
        <Text fontSize="md" color="gray.400" noOfLines={2}>
          {drive && formatDriveTimeLeft(drive)}
        </Text>
        <Stack as="ul" my="7" gridGap="7">
          {drive?.files.map((file) => (
            <FileItem file={file} key={file.name} />
          ))}
        </Stack>
        {loading && 'loading...'}
      </Box>
    </Box>
  );
};

export default Files;
