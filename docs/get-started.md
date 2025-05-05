# Get Started

### Installation

Install the package using `node.js`.

**npm**
```sh
npm install jqlite-ts
```

**yarn**
```sh
yarn add jqlite-ts
```

**pnpm**
```sh
pnpm add jqlite-ts
```

### Usage

```js
import { data, config, query} from 'jqlite-ts';

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
