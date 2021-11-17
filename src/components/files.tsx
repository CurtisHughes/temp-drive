import { Flex, Heading, Stack, Box, Button, Progress, Icon, IconButton, Text, chakra } from '@chakra-ui/react';
import { MdInsertDriveFile } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

export const Files = () => {
  return (
    <Box mx="auto" w="100%" h="100%" px="6" justify="space-between" maxW="container.xl">
      <Flex justify="space-between" mt="9">
        <Heading as="h1" fontSize="3xl">
          Files
        </Heading>
        <Button color="primary" variant="link">
          + New File
        </Button>
      </Flex>
      <Stack my="7" gridGap="7">
        <Flex as="article" w="100%" align="center" alignItems="flex-start">
          <Icon as={MdInsertDriveFile} boxSize={12} color="gray.700" transform="translateX(-8px)" />
          <chakra.div width="100%" textAlign="left">
            <Flex justifyContent="space-between" alignItems="center">
              <chakra.span paddingRight="2">
                <chakra.header>Photos.zip</chakra.header>
                <Text fontSize="xs" color="gray.400" noOfLines={2}>
                  random-random-random-random
                </Text>
              </chakra.span>
              <IconButton aria-label="options" icon={<FaEllipsisV />} />
            </Flex>
            <Progress value={20} size="xs" colorScheme="teal" marginTop="4" />
          </chakra.div>
        </Flex>
        <Flex as="article" w="100%" align="center" alignItems="flex-start">
          <Icon as={MdInsertDriveFile} boxSize={12} color="gray.700" transform="translateX(-8px)" />
          <chakra.div width="100%" textAlign="left">
            <Flex justifyContent="space-between" alignItems="center">
              <chakra.span>
                <chakra.header>Video.zip</chakra.header>
                <Text fontSize="xs" color="gray.400" noOfLines={2}>
                  five-random-words-to-remember
                </Text>
              </chakra.span>
              <IconButton aria-label="options" icon={<FaEllipsisV />} />
            </Flex>
            <Progress value={60} size="xs" colorScheme="teal" marginTop="4" />
          </chakra.div>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Files;
