import { useEffect, useState } from 'react';
import { Flex, Progress, Icon, IconButton, Text, Menu, MenuButton, MenuList, MenuItem, chakra } from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import { FiHardDrive } from 'react-icons/fi';
import { DateTime } from 'luxon';

import { Drive } from '../../gateways/drives';
import { calculateTimeLeftInMinutes } from '../../utils/timeLeftInMinutes';
import { useRemoveDrive } from '../../gateways/drives/hooks/useRemoveDrive';

export const DriveItem: React.FC<{ drive: Drive }> = ({ drive }) => {
  const [{ loading }, removeDrive] = useRemoveDrive();
  const [dateTime, setDateTime] = useState(DateTime.local());
  const timeLeftInMinutes = calculateTimeLeftInMinutes(drive.createdDateTime, dateTime);

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
            <chakra.header>{drive.name}</chakra.header>
            <Text fontSize="xs" color="gray.400" noOfLines={2}>
              {`${Math.round(timeLeftInMinutes)} minute(s) left`}
            </Text>
          </chakra.span>
          <Menu>
            <MenuButton
              onClick={(e) => e.stopPropagation()}
              as={IconButton}
              isLoading={loading}
              aria-label="options"
              icon={<FaEllipsisV />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  removeDrive(drive);
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Progress value={(timeLeftInMinutes / 15) * 100} size="xs" colorScheme="teal" marginTop="4" />
      </chakra.div>
    </Flex>
  );
};
