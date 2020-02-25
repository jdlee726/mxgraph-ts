# mxgraph-ts

[![Build Status](https://travis-ci.org/boycgit/mxgraph-ts.svg?branch=master)](https://travis-ci.org/boycgit/mxgraph-ts) [![Coverage Status](https://coveralls.io/repos/github/boycgit/mxgraph-ts/badge.svg?branch=master)](https://coveralls.io/github/boycgit/mxgraph-ts?branch=master) [![NPM](https://img.shields.io/npm/l/mxgraph.svg?style=popout)](https://opensource.org/licenses/Apache-2.0) [![npm version](https://badge.fury.io/js/mxgraph-ts.svg)](https://badge.fury.io/js/mxgraph-ts) [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Typescript Version portion of mxGraph
 - fully migrate from [mxGraph v4.0.1](https://lodash.com/docs/4.17.11#debounce)
 - rewritten with Typescript
 - no dependencies
 - bundle size <20K ; < 3KB when gzip;


## Installation

### Node.js / Browserify

```bash
npm install mxgraph-ts --save
```

```javascript
const {debounce, throttle} = require('mxgraph-ts');

```

### Global object

Include the pre-built script.

```html
<script src="./dist/index.umd.min.js"></script>

<script>
const {debounce, throttle} = window.debounceThrottle;

</script>
```

## Build & test

```bash
npm run build
```

```bash
npm test
```

## License

[Apache License](LICENSE).
