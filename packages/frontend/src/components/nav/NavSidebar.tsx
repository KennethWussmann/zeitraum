import { Flex, Stack } from '@chakra-ui/react';
import { NavItems } from './NavItems';
import { Logo } from './Logo';

export const NavSidebar = () => (
  <Flex
    flex="1"
    maxW={{ base: 'full', sm: '2xs' }}
    py={{ base: '6', sm: '8' }}
    px={{ base: '4', sm: '6' }}
    bg={'gray.900'}
  >
    <Stack justify="space-between" spacing="1">
      <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
        <Logo w={'100%'} />
        <Stack spacing="1">
          <NavItems />
        </Stack>
      </Stack>
    </Stack>
  </Flex>
);
