import { Flex, Progress, Icon, IconButton, Text, Menu, MenuButton, MenuList, MenuItem, chakra } from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import { FiHardDrive } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { driveStore, Drive, formatDriveTimeLeft } from '../../store';

export const DriveItem: React.FC<{ drive: Drive }> = ({ drive }) => {
  const history = useHistory();
  const handleError = useErrorHandler();

  return (
    <Flex
      as="li"
      w="100%"
      align="center"
      alignItems="flex-start"
      cursor="pointer"
      onClick={() => {
        history.push(`/drives/${drive.name}/files`);
      }}
    >
      <Icon as={FiHardDrive} boxSize={12} color="gray.700" />
      <chakra.div width="100%" textAlign="left" ml="3">
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span paddingRight="2">
            <chakra.header>{drive.name}</chakra.header>
            <Text fontSize="xs" color="gray.400" noOfLines={2}>
              {formatDriveTimeLeft(drive)}
            </Text>
          </chakra.span>
          <Menu>
            <MenuButton
              onClick={(e) => {
                e.stopPropagation();
              }}
              as={IconButton}
              aria-label="options"
              icon={<FaEllipsisV />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  try {
                    e.stopPropagation();
                    driveStore.removeDrive(drive);
                  } catch (err) {
                    handleError(err);
                  }
                }}
              >
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Progress value={drive.timeLeft.percent} size="xs" marginTop="4" />
      </chakra.div>
    </Flex>
  );
};
