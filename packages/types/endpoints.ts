import type { Color } from './data/color';

export type KnownAuthenticatedEndpoint =
  | 'get_user_profile';

export type KnownUnauthorizedEnpoint =
  | '/api/v3/lego/colors/';

export type KnownEndpoint = KnownAuthenticatedEndpoint | KnownUnauthorizedEnpoint;

// helper types for parameters
type CombineParameters<P1 extends string, P2 extends string> = `${P1}&${P2}` | `${P2}&${P1}`;

type WithParameters<Url extends string, Parameters extends string | undefined = undefined> =
  Parameters extends undefined ? Url : `${Url}?${Parameters}`;

// helper for paginated parameters
type PaginatedParameters = `page_num=${number}` | `page_size=${number}` | CombineParameters<`page_num=${number}`, `page_size=${number}`>;
type PaginatedEndpointUrl<Endpoint extends KnownEndpoint> = WithParameters<Endpoint, PaginatedParameters>;

type PaginatedResponseType<Endpoint extends KnownEndpoint, T> =
  Endpoint extends PaginatedEndpointUrl<KnownEndpoint> ? { count: number, next: string | null, previous: string | null, results: T[] } :
  unknown;

type Options = {};

export type AuthenticatedOptions = {
  userToken: string;
};

export type OptionsByEndpoint<Endpoint extends string> =
  Endpoint extends KnownAuthenticatedEndpoint ? Options & AuthenticatedOptions :
  Partial<AuthenticatedOptions>;

export type EndpointType<Url extends KnownEndpoint | (string & {})> =
  Url extends PaginatedEndpointUrl<'/api/v3/lego/colors/'> ? PaginatedResponseType<'/api/v3/lego/colors/', Color> :
  unknown;

export type ValidateEndpointUrl<T extends string> = unknown extends EndpointType<T> ? 'unknown endpoint URL' : T;
