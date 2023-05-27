import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  VStack,
  useBreakpointValue,
  IconButton,
  Divider,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Logo } from './Logo';
import { NavItems } from './NavItems';

export const NavTopbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [menuOpen, setMenuOpen] = useState(false);

  useOutsideClick({
    ref: navRef,
    handler: () => setMenuOpen(false),
  });

  return (
    <Box ref={navRef} as="nav" position="fixed" zIndex={100} py={4} top={0} w="100%" bg={'gray.900'}>
      <Container maxW="container.xl">
        <HStack justifyContent={'space-between'}>
          <Logo />
          <Spacer />
          <IconButton
            variant="ghost"
            icon={menuOpen ? <FiX /> : <FiMenu />}
            aria-label="Open or close menu"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </HStack>
        {!isDesktop && menuOpen && (
          <VStack spacing="5" align={'stretch'}>
            <Spacer />
            <Divider />
            <NavItems />
          </VStack>
        )}
      </Container>
    </Box>
  );
};
