import { getSdk } from './sdk';
import { fetch } from 'cross-fetch';

export type ZeitraumClientOptions = {
  /**
   * The base URL of the Zeitraum server.
   * @example https://my-zeitraum-server.com
   */
  baseUrl: string;
  /**
   * The API token to use for authentication.
   */
  apiToken: string;
  /**
   * The fetch implementation to use. Defaults to `cross-fetch`.
   * @default cross-fetch
   * @see https://www.npmjs.com/package/cross-fetch
   */
  fetch?: typeof fetch;
};

const buildGraphQLUrl = (input: string) => {
  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    input = 'https://' + input;
  }
  const url = new URL(input);
  url.pathname = '/graphql';
  return url.toString();
};

/**
 * Create a Zeitraum API client.
 */
export const zeitraum = (options: ZeitraumClientOptions) => {
  return getSdk(async (query: string, variables: unknown) => {
    const response = await (options.fetch ?? fetch)(buildGraphQLUrl(options.baseUrl), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${options.apiToken}`,
        accept: 'application/json',
        'content-type': 'application/json',
        'user-agent': 'zeitraum-client',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const body = await response.json();
    return body.data;
  });
};
