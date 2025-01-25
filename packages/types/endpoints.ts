import type { Color } from './data/color';
import type { Element } from './data/element';
import type { Minifig } from './data/minifig';
import type { Part } from './data/part';
import type { PartCategory } from './data/part-categories';
import type { Theme } from './data/theme';

type BasePath = '/api/v3';

export type KnownAuthenticatedEndpoint =
  | `${BasePath}/colors/`
  | `${BasePath}/lego/elements/${string}`
  | `${BasePath}/lego/minifigs/`
  | `${BasePath}/lego/part_categories/`
  | `${BasePath}/lego/parts/`
  | `${BasePath}/lego/parts/${string}/colors/`
  | `${BasePath}/lego/parts/${string}/colors/${number}/sets/`
  | `${BasePath}/lego/sets/`
  | `${BasePath}/lego/sets/${string}/alternates/`
  | `${BasePath}/lego/sets/${string}/minifigs/`
  | `${BasePath}/lego/sets/${string}/parts/`
  | `${BasePath}/lego/sets/${string}/sets/`
  | `${BasePath}/lego/themes/`
  | `${BasePath}/lego/themes/${number}/`
  | `${BasePath}/users/_token/`
  | `${BasePath}/users/${string}/allparts/`
  | `${BasePath}/users/${string}/build/${string}/`
  | `${BasePath}/users/${string}/lost_parts/`
  | `${BasePath}/users/${string}/profile/`;

export type KnownUnauthorizedEnpoint = never;

export type KnownBulkExpandedEndpoint =
  | `${BasePath}/lego/colors/`
  | `${BasePath}/lego/minifigs/`
  | `${BasePath}/lego/part_categories/`
  | `${BasePath}/lego/parts/`
  | `${BasePath}/lego/parts/${string}/colors/`
  | `${BasePath}/lego/themes/`;

export type KnownEndpoint = KnownAuthenticatedEndpoint | KnownUnauthorizedEnpoint | KnownBulkExpandedEndpoint;

// helper types for parameters
type CombineParameters<P1 extends string, P2 extends string> = `${P1}&${P2}` | `${P2}&${P1}`;

type WithParameters<Url extends string, Parameters extends string | undefined = undefined> =
  Parameters extends undefined ? Url : `${Url}?${Parameters}`;

// helper for paginated parameters
type PaginatedParameters = `page_num=${number}` | `page_size=${number}` | CombineParameters<`page_num=${number}`, `page_size=${number}`>;
type PaginatedEndpointUrl<Endpoint extends KnownEndpoint> = Endpoint | WithParameters<Endpoint, PaginatedParameters>;

// herlper for search parameters
type SearchParameters = `search=${string}`;
type SearchEndpointUrl<Endpoint extends KnownEndpoint> = Endpoint | WithParameters<Endpoint, SearchParameters>;

// helper for ordering parameters
type OrderingParameters = `ordering=${string}`;
type OrderingEndpointUrl<Endpoint extends KnownEndpoint> = Endpoint | WithParameters<Endpoint, OrderingParameters>;

type PaginatedResponseType<Endpoint extends KnownEndpoint, T> =
  Endpoint extends PaginatedEndpointUrl<KnownEndpoint> ? { count: number, next: string | null, previous: string | null, results: T[] } :
  unknown;

// helper types for bulk requests
type BulkExpandedSingleEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> = `${Endpoint}${Id}/`;
type BulkExpandedManyEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint> = WithParameters<Endpoint, PaginatedParameters>;
type BulkExpandedEndpointUrl<Endpoint extends KnownBulkExpandedEndpoint, Id extends string | number> =
  Endpoint | BulkExpandedSingleEndpointUrl<Endpoint, Id> | BulkExpandedManyEndpointUrl<Endpoint>;

type BulkExpandedResponseType<Endpoint extends KnownBulkExpandedEndpoint, Url extends string, Id extends string | number, T> =
  // base endpoint returns a paginated response
  Url extends Endpoint ? PaginatedResponseType<Endpoint, T> :
  // make sure the id does not include a slash (if there are sub-endpoints, they have to be listed first in `EndpointType`)
  Url extends `${Endpoint}/${Id}/${string}/` ? unknown :
  // handle single id requests (`endpoint/:id/)
  Url extends BulkExpandedSingleEndpointUrl<Endpoint, Id> ? T :
  // handle many requests (`endpoint` or paginated)
  Url extends BulkExpandedManyEndpointUrl<Endpoint> ? PaginatedResponseType<Endpoint, T> :
  // otherwise this is not a known bulk request
  unknown;

type Options = {};

export type AuthenticatedOptions = {
  key: string;
};

export type OptionsByEndpoint<Endpoint extends string> =
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownUnauthorizedEnpoint, string | number> ? Options :
  Endpoint extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint & KnownAuthenticatedEndpoint, string | number> ? Options & AuthenticatedOptions :
  Endpoint extends KnownAuthenticatedEndpoint ? Options & AuthenticatedOptions :
  Endpoint extends KnownEndpoint | BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? Options :
  Partial<AuthenticatedOptions>;

export type EndpointType<Url extends KnownEndpoint | (string & {})> =
  Url extends `/api/v3/lego/elements/${string}` ? Element :
  Url extends BulkExpandedEndpointUrl<'/api/v3/lego/colors/', string> ? BulkExpandedResponseType<'/api/v3/lego/colors/', Url, string, Color> :
  Url extends BulkExpandedEndpointUrl<'/api/v3/lego/minifigs/', string> ? BulkExpandedResponseType<'/api/v3/lego/minifigs/', Url, string, Minifig> :
  Url extends BulkExpandedEndpointUrl<'/api/v3/lego/part_categories/', number> ? BulkExpandedResponseType<'/api/v3/lego/part_categories/', Url, number, PartCategory> :
  Url extends BulkExpandedEndpointUrl<'/api/v3/lego/themes/', number> ? BulkExpandedResponseType<'/api/v3/lego/themes/', Url, number, Theme> :
  Url extends `/api/v3/lego/parts/${string}/colors/` ? PaginatedResponseType<Url, Color> :
  Url extends BulkExpandedEndpointUrl<'/api/v3/lego/parts/', string> ? BulkExpandedResponseType<'/api/v3/lego/parts/', Url, string, Part> :
  // fallback for all bulk expanded URLs
  Url extends BulkExpandedEndpointUrl<KnownBulkExpandedEndpoint, string | number> ? BulkExpandedResponseType<KnownBulkExpandedEndpoint, Url, string | number, unknown> :
  // fallback for other urls
  unknown;

export type ValidateEndpointUrl<T extends string> = unknown extends EndpointType<T> ? 'unknown endpoint URL' : T;
