import React from 'react';
import { Flex, Heading, Icon, Box } from '@chakra-ui/react';
import { FaRegGrimace } from 'react-icons/fa';

export const ErrorFallback: React.FC = () => {
  return (
    <Box mx="auto" px="6" maxW="sm">
      <Flex minHeight="70vh" textAlign="center" alignItems="center" flexDirection="column" justifyContent="center">
        <Icon boxSize="12" as={FaRegGrimace} mb="6" />
        <Heading>Oops! Something went wrong.</Heading>
      </Flex>
    </Box>
  );
};

export default ErrorFallback;
