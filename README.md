# http_build_query in JavaScript 

> Port of PHP's Http Query Builder into JavaScript

## Usage

```ts

import httpBuildQuery from 'http-build-query';

// 1. parameter - any array, object, string, null or undefined
// 2. parameter - argument separator - defaults to '&'
const query: string = httpBuildQuery({ 
   orderBy: [
     { column: 'created', desc: true
   ]
}); // expects: orderBy[0][column]=created&orderBy[0][desc]=1

```
