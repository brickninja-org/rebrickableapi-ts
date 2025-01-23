import type { AuthenticatedOptions, EndpointType, KnownEndpoint, OptionsByEndpoint } from '@rebrickableapi/types/endpoints';

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

// if OptionsByEndPoint<Url> has no required keys, make the options parameter optional
type Args<Url extends string> = RequiredKeys<OptionsByEndpoint<Url>> extends never
  ? [endpoint: Url, options?: FetchRebrickableOptions & OptionsByEndpoint<Url> & FetchOptions]
  : [endpoint: Url, options: FetchRebrickableOptions & OptionsByEndpoint<Url> & FetchOptions];

export async function fetchRebrickableAPI<
  Url extends KnownEndpoint | (string & {}),
>(
  ...[endpoint, options]: Args<Url>
): Promise<EndpointType<Url>> {
  const url = new URL(endpoint, 'https://rebrickable.com/');

  if (hasAccessToken(options)) {
    url.searchParams.set('user_token', options.key);
  }

  let request = new Request(url, {
    signal: options.signal,
    cache: options.cache,
  });

  // if there is a onRequest handler registered, let it modify the request
  if (options.onRequest) {
    request = await options.onRequest(request);

    if (!(request instanceof Request)) {
      throw new Error('The onRequest handler must return a Request instance.');
    }
  }

  // call the Rebrickable API
  const response = await fetch(request);

  // call the onResponse handler
  await options.onResponse?.(response);

  // check if the response is json (`application/json; charset=utf-8`)
  const isJSON = response.headers.get('content-type').includes('application/json');

  // censor the user token in URL to not leak it in error messages
  const erroredURL = hasAccessToken(options)
    ? url.toString().replace(options.key, '***')
    : url.toString();

  // check if the response is an error
  if (!response.ok) {
    // if the response is JSON, it might have more details in the `text` property
    if (isJSON) {
      const error: unknown = await response.json();

      if (typeof error === 'object' && 'detail' in error && typeof error.detail === 'string') {
        throw new RebrickableAPIError(`The Rebrickable API call to '${erroredURL}' returned ${response.status} ${response.statusText}: ${error.detail}`, response);
      }
    }

    // otherwise just throw error with the status code
    throw new RebrickableAPIError(`The Rebrickable API call to '${erroredURL}' returned ${response.status} ${response.statusText}.`, response);
  }

  // if the response is not JSON, throw an error
  if (!isJSON) {
    throw new RebrickableAPIError(`The Rebrickable API call to '${erroredURL}' did not respond with a JSON response.`, response);
  }

  // parse the JSON response
  const json = await response.json();

  // TODO: catch more errors

  return json;
}

export type FetchRebrickableOptions = {
  /** onRequest handler allows to modify the request made to the Rebrickable API. */
  onRequest?: (request: Request) => Request | Promise<Request>;

  /**
   * onResponse handler. Called for all responses, successful or not.
   * Make sure to clone the response in case of consuming the body.
   */
  onResponse?: (response: Response) => void | Promise<void>;
};

export type FetchOptions = {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal */
  signal?: AbortSignal;

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache */
  cache?: RequestCache;
};

export class RebrickableAPIError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
    this.name = 'RebrickableAPIError';
  }
}

function hasAccessToken(options: OptionsByEndpoint<any>): options is AuthenticatedOptions {
  return 'key' in options;
}
