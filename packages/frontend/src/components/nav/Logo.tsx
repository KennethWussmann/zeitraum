import { Button, ButtonProps, HStack, Text } from '@chakra-ui/react';

export const Logo = (props: ButtonProps) => (
  <Button variant="ghost" justifyContent={'start'} {...props}>
    <HStack spacing="3">
      <Text color="on-accent-subtle">Zeitraum</Text>
    </HStack>
  </Button>
);
