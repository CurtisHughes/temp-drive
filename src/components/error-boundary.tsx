import React, { ErrorInfo } from 'react';
import { Flex, Heading, Icon, Box } from '@chakra-ui/react';
import { FaRegGrimace } from 'react-icons/fa';

type ErrorBoundaryProps = {
  logger?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.logger && this.props.logger(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box mx="auto" px="6" maxW="sm">
          <Flex minHeight="70vh" textAlign="center" alignItems="center" flexDirection="column" justifyContent="center">
            <Icon boxSize="12" as={FaRegGrimace} mb="6" />
            <Heading>Oops! Something went wrong.</Heading>
          </Flex>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
