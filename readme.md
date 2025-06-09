# GOV.UK Pagination Module

A simple utility to calculate which pages to show when using the pagination component from the GOV.UK Design System.

## Features

- Calculates pagination items, including ellipses, previous and next links.
- Supports custom URL bases and suffixes.
- Accepts either a total page count or an array of custom URLs for more complex routes.
- Output is compatible with the `govukPagination` Nunjucks macro from the GOV.UK Design System.

## Installation

```sh
npm install govuk-pagination-module
```

## Usage

You can import this into your routes.js file using the following code:

```js
import { createGOVUKPagination } from './index.js';

const pagination = createGOVUKPagination(3, {
  numPages: 10,
  pathBase: '/results?page=',
  pageBuffer: 2
});

console.log(pagination);
```

If your URL is more complex than adding the page number to the URL then you can supply an array of URLs in the order you want the pages to appear.

```js
const hrefs = [
  '/user-details/1176',
  '/user-details/2753',
  '/user-details/8273',
  // ...
];

const pagination = createGOVUKPagination(2, {
  hrefArray: hrefs
});
```

You can send the output pagination object to your template and use the following nunjucks macro to create the pagination component:

```nunjucks
  {{ govukPagination(pagination) }}
```

## Configuration

### `createGOVUKPagination(currPage, options)`

| Parameter      | Type      | Description                                                                 |
| -------------- | --------- | --------------------------------------------------------------------------- |
| `currPage`     | `number`  | The current page number (1-based).                                          |
| `options`      | `object`  | Options object (see below).                                                 |

#### Options

- `numPages` (`number`): Total number of pages (required if `hrefArray` not provided).
- `pathBase` (`string`, default: `"/"`): Base path for URLs.
- `pathEnd` (`string`, default: `"?page="`): The URL suffix before the page number.
- `pageBuffer` (`number`, default: `2`): Number of pages to show around the current page.
- `hrefArray` (`string[]`, default: `null`): Array of URLs for each page.

#### Returns

An object with the following structure:

```js
{
  previous: { href: '/results?page=2' }, // if applicable
  next: { href: '/results?page=4' },     // if applicable
  items: [
    { number: 1, href: '/results?page=1' },
    { ellipsis: true },
    { number: 3, href: '/results?page=3', current: true },
    // ...
  ]
}
```

## License

MIT

---