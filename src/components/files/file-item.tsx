import { Flex, Icon, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, Progress, chakra } from '@chakra-ui/react';
import { AiOutlineFile, AiOutlineCloudDownload, AiOutlineDelete } from 'react-icons/ai';
import { FaEllipsisV } from 'react-icons/fa';

import { File } from '../../store/drive-store';

type FileItemProps = {
  file: File;
};

export const FileItem: React.FC<FileItemProps> = ({ file }) => {
  return (
    <Flex
      as="li"
      w="100%"
      align="center"
      alignItems="flex-start"
      cursor="pointer"
      onClick={() => {
        console.log('downloading...');
      }}
    >
      <Icon as={AiOutlineFile} boxSize={12} color="gray.700" />
      <chakra.div width="100%" textAlign="left" ml="3">
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span paddingRight="2">
            <chakra.header>{file.name}</chakra.header>
            <Text fontSize="xs" color="gray.400" noOfLines={2}>
              {file.size}
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
                  e.stopPropagation();
                  console.log('deleting...');
                }}
              >
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Text>Delete</Text>
                  <Icon as={AiOutlineDelete} boxSize={6} color="gray.700" />
                </Flex>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('downloading...');
                }}
              >
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Text>Download</Text>
                  <Icon as={AiOutlineCloudDownload} boxSize={6} color="gray.700" />
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Progress as="div" value={0} size="xs" marginTop="4" />
        {/* potentially show download progress and 100% if already downloaded */}
      </chakra.div>
    </Flex>
  );
};

export default FileItem;
