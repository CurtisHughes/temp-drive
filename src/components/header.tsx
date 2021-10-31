import { chakra, Flex, Menu, MenuButton, IconButton, MenuList, MenuItem, Link, Box } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useViewportScroll } from 'framer-motion';

type HeaderProps = {
  inverse?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ inverse = true }) => {
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
      left="0"
      right="0"
      width="full"
    >
      <chakra.div height="16" bg={inverse ? 'primary' : 'white'}>
        <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
          <Flex>
            <Menu>
              <MenuButton as={IconButton} color="primary" bg="white" aria-label="Options" icon={<HamburgerIcon />} />
              <MenuList>
                <Link as={ReactRouterLink} to="/">
                  <MenuItem>Home</MenuItem>
                </Link>
                <Link as={ReactRouterLink} to="/files">
                  <MenuItem>Files</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
          <Flex align="center">
            <Link to="/">
              <Box width="8" height="8" bg={inverse ? 'white' : 'primary'} borderRadius="50%" />
            </Link>
          </Flex>
        </Flex>
      </chakra.div>
    </chakra.header>
  );
};

export default Header;
