import { Flex, Heading } from '@chakra-ui/react';

export const Home = () => {
  return (
    <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
      <Heading as="h1" fontSize="3xl" mt="4">
        Home
      </Heading>
    </Flex>
  );
};

export default Home;
