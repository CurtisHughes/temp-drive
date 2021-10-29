import {
  chakra,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useViewportScroll } from 'framer-motion';

export const Header = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const ref: any = useRef<HTMLHeadingElement>();
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useViewportScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
    >
      <chakra.div height="4.5rem" mx="auto" maxW="8xl">
        <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
          <Flex>
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
              <MenuList>
                <Link to="/">
                  <MenuItem>Home</MenuItem>
                </Link>
                <Link to="/files">
                  <MenuItem>Files</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
          <Flex align="center">
            <Link to="/">
              <Box width="2rem" height="2rem" bg="#92CBC5" borderRadius="50%" />
            </Link>
          </Flex>
        </Flex>
      </chakra.div>
    </chakra.header>
  );
};

export default Header;
