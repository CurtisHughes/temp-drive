import { ArrowForwardIcon } from '@chakra-ui/icons';
import { chakra, Flex, Heading, Box, Button, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Home = () => {
  return (
    <Box>
      <Flex
        width="100%"
        height="100vh"
        clipPath="polygon(0 0,100% 0,100% 50%,0 85%)"
        backgroundColor="primary"
        alignItems="center"
        justifyContent="center"
      >
        <Box mb="40vh" maxW="sm" px="6">
          <Heading as="h1" fontSize="5xl" mt="4" color="white">
            Temp Drive
          </Heading>
          <chakra.p color="white" fontSize="xl">
            upload, download, share no logins requried
          </chakra.p>
          <Link as={ReactRouterLink} to="/files">
            <Button mt="6" variant="outline" color="white" rightIcon={<ArrowForwardIcon />}>
              GET STARTED
            </Button>
          </Link>
        </Box>
      </Flex>
      <Flex width="100%" height="100vh" backgroundColor="primary" alignItems="center" justifyContent="center"></Flex>
      <Flex width="100%" height="100vh" alignItems="center" justifyContent="center"></Flex>
    </Box>
  );
};

export default Home;
