# Get Started

## Installation

Install the package using your favorite package manager.

```sh
# npm
npm install jqlite-ts

# yarn
yarn add jqlite-ts

# pnpm
pnpm add jqlite-ts
```

## Quick Start

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

## Data Handling

JQLite supports different data sources. You can load data from a file, a URL, or a object.

```js
import { data } from 'jqlite-ts';

// Load data from a file
data.load("./data.json")

// Load data from a URL
data.fetch("https://api.example.com/data.json")

// Load data from a object
data.set({
  "name": "John Doe",
  "age": 30,
})
```

## Config Management

JQLite will check the root folder for `jqlite.json` file. If it exists, it will be used to override the default config. You can also set the config manually.

```js
import { config } from 'jqlite-ts';

// Override the default config
config.set({
  "fallback": "No data found",
  "debug": true,
})

// Load a config file
config.load("./custom-jqlite.json")
```
