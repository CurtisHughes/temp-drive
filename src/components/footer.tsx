import { Link } from 'react-router-dom';
import { chakra, Flex, Text, Icon } from '@chakra-ui/react';
import { DiGithubBadge } from 'react-icons/di';

export const Footer = () => {
  return (
    <chakra.footer bg="#92CBC5" left="0" right="0" width="full">
      <chakra.div height="3rem" mx="auto" maxW="8xl">
        <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
          <Flex>
            <Text color="white" fontSize="sm">
              Copyright 2021
            </Text>
          </Flex>
          <Flex>
            <Link to="/">
              <Icon as={DiGithubBadge} boxSize={8} color="white" />
            </Link>
          </Flex>
        </Flex>
      </chakra.div>
    </chakra.footer>
  );
};

export default Footer;
