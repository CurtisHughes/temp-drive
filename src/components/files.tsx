import { Flex, Heading, Stack, Box, Button, Progress } from '@chakra-ui/react';

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
      <Stack my="7">
        <Flex w="100%" h="40px" bg="gray.100" align="center">
          Photos.zip
        </Flex>
        <Progress value={20} size="xs" colorScheme="teal" />
        <Flex w="100%" h="40px" bg="gray.100" align="center">
          Videos.zip
        </Flex>
        <Progress value={60} size="xs" colorScheme="teal" />
      </Stack>
    </Box>
  );
};

export default Files;
