import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export interface ResolverContext {
  req?: IncomingMessage;
  res?: ServerResponse;
}
const httpLink = new HttpLink({
  uri: typeof window !== 'undefined' ? '/api/graphql' : `${process.env.BACKEND_BASE_URL}graphql`,
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const apiToken = localStorage.getItem('apiToken');
    return fetch(input, {
      ...init,
      headers: apiToken
        ? {
            ...init?.headers,
            Authorization: apiToken,
          }
        : init?.headers,
    });
  },
});

const createApolloClient = (_?: ResolverContext) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext,
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export const useApollo = (initialState: any = undefined) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
