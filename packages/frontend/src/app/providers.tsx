'use client';

import { useApollo } from '@/lib/graphql/apollo';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorMode, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useApollo();
  const theme = extendTheme({ initialColorMode: 'dark', useSystemColorMode: true });
  return (
    <CacheProvider>
      <ChakraProvider
        theme={theme}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        colorModeManager={{ type: 'localStorage', get: (init: ColorMode | undefined) => init, set: () => {} }}
      >
        <Head>
          <title>Zeitraum</title>
        </Head>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
