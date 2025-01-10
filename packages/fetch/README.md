# `@rebrickableapi/fetch`

This package provides a tiny wrapper around native fetch to call the Rebrickable API that returns typesafe responses.

## Usage

```ts
import { fetchRebrickableAPI } from '@rebrickableapiapi/fetch';

const item = await fetchRebrickableAPI('/api/v3/colors');
// -> { id: number, name: string, ... }
```

## Installation

```sh
npm i @rebrickableapi/fetch
```

## Contributing

See [parent readme](../../README.md#contributing).

## License

Licensed under the [MIT License](./LICENSE).
