# Get Started

### Installation

Install the package using `node.js`.

**npm**
```sh
npm install @jqlite/core
```

**yarn**
```sh
yarn add @jqlite/core
```

**pnpm**
```sh
pnpm add @jqlite/core
```

### Usage

```js
import { data, config, query} from '@jqlite/core';

// Load the data from a file
data.load("./data.json")

// Override the default config
config.set({
  "fallback": "No data found",
})

// Run the query
query.run("$.friends[*].(name, age)", (result) => {
  console.log(result)
})
```
