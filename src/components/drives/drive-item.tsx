import { useEffect, useState } from 'react';
import { Flex, Progress, Icon, IconButton, Text, chakra } from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import { FiHardDrive } from 'react-icons/fi';
import { DateTime } from 'luxon';

import { Drive } from '../../gateways/drives';
import { calculateTimeLeftInMinutes } from '../../utils/timeLeftInMinutes';

export const DriveItem: React.FC<{ drive: Drive }> = ({ drive: { createdDateTime, name } }) => {
  const [dateTime, setDateTime] = useState(DateTime.local());
  const timeLeftInMinutes = calculateTimeLeftInMinutes(createdDateTime, dateTime);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(DateTime.local()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  if (timeLeftInMinutes < 0) {
    return null;
  }

  return (
    <Flex onClick={() => console.log('flex')} as="li" w="100%" align="center" alignItems="flex-start" cursor="pointer">
      <Icon as={FiHardDrive} boxSize={12} color="gray.700" />
      <chakra.div width="100%" textAlign="left" ml="3">
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span paddingRight="2">
            <chakra.header>{name}</chakra.header>
            <Text fontSize="xs" color="gray.400" noOfLines={2}>
              {`${Math.round(timeLeftInMinutes)} minute(s) left`}
            </Text>
          </chakra.span>
          <IconButton
            aria-label="options"
            icon={<FaEllipsisV />}
            onClick={(e) => {
              e.stopPropagation();
              console.log('icon');
            }}
          />
        </Flex>
        <Progress value={(timeLeftInMinutes / 15) * 100} size="xs" colorScheme="teal" marginTop="4" />
      </chakra.div>
    </Flex>
  );
};
