import { chakra, Flex, Text, Icon, Link } from '@chakra-ui/react';
import { DiGithubBadge } from 'react-icons/di';

export const Footer = () => {
  return (
    <chakra.footer bg="primary">
      <chakra.div height="12">
        <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
          <Flex>
            <Text color="white" fontSize="sm">
              Copyright 2021
            </Text>
          </Flex>
          <Flex>
            <Link href="https://github.com/CurtisHughes/temp-drive" isExternal>
              <Icon as={DiGithubBadge} boxSize={8} color="white" />
            </Link>
          </Flex>
        </Flex>
      </chakra.div>
    </chakra.footer>
  );
};

export default Footer;
