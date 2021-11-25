import { Heading, Box, Link, Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';

import { useDriveByName } from '../../store';
import { Page } from '../page';

export const Files = () => {
  let { driveName } = useParams<{ driveName: string }>();
  const { value: drive, loading, error } = useDriveByName(driveName);

  return (
    <Page
      mx="auto"
      w="100%"
      h="100%"
      px="6"
      justify="space-between"
      maxW="container.xl"
      loading={loading}
      error={error}
    >
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
          {`${drive && Math.round(drive.timeLeftInMinutes)} minute(s) left`}
        </Text>
      </Box>
    </Page>
  );
};

export default Files;
