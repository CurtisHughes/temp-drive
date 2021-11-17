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
            upload, download, share. no logins required
          </chakra.p>
          <Link as={ReactRouterLink} to="/files" color="white">
            <Button
              mt="6"
              variant="outline"
              color="white"
              rightIcon={<ArrowForwardIcon />}
              _hover={{ bg: '#ffffff3d' }}
            >
              GET STARTED
            </Button>
          </Link>
        </Box>
      </Flex>
      <Flex as="section" width="100%" justifyContent="center">
        <Box mb="20vh" maxW="3xl" px="6">
          <Heading>About</Heading>
          <chakra.hr width="60%" />
          <chakra.p mt="7" fontSize="xl">
            Temp Drive is a simple solution to a common problem, sharing files between devices. It acts as a temporary
            network storage that securely hosts your files via a time sensitive passphrase. Files and data are
            unavailable after the expired time and completely deleted after 24 hours to protect your information (and
            save money on data storage).
          </chakra.p>
          <chakra.p mt="7" fontSize="xl">
            One of the main goals when creating Temp Drive was to avoid annoying logins. It accomplishes this by
            assigning each file a unique "passphrase" consisting of 5 randomly selected words.
          </chakra.p>
          <chakra.p mt="7" fontSize="xl">
            Don’t trust me? Check out the source code or host your own solution! This entire project is open source and
            we highly encourage people to contribute, raise issues, and ask questions.
          </chakra.p>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
