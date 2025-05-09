# API Reference

| Component | Description |
| --------- | ----------- |
| `data`    | Define the data for the query. |
| `config`  | Define the configuration for the query. |
| `query`   | Define the query to be executed on the data. |

## `data`

`get`

Retrieve the current data.

**Returns**: `Record<string, unknown> | unknown[]` - The current data object

```ts
data.get()
```

`set`

Set the data for the query.

**Parameters**:
 - jsonData: `Record<string, unknown> | unknown[]` - The data object to use

**Returns**: `void`

```ts
data.set({
  "name": "John Doe",
  "age": 30,
  "city": "New York"
})
```

`clear`

Clear the current data.

**Returns**: `void`

```ts
data.clear()
```

`print`

Print the current data to the console.

**Returns**: `void`

```ts
data.print()
```

`load`

Load data from a file.

**Parameters**:
 - filePath: `string` - The JSON file path

**Returns**: `object` - The JSON object

```ts
data.load('path/to/file.json')
```

`fetch`

Fetch data from a URL.

**Parameters**:
 - url: `string` - The JSON URL path

**Returns**: `object` - The JSON object

```ts
await data.fetch('https://api.example.com/data')
```

---

## `config`

`get`

Retrieve the current configuration.

**Returns**: `object` - The config object

```ts
config.get()
```

`set`

Override the configuration for the query.

**Parameters**:
 - config: `object` - The config object to override

**Returns**: `object` - The new config object

```ts
config.set({
  fallback: "No data found",
  quotedArguments: false,
})
```

`load`

Load configuration from a JSON file.

**Parameters**:
 - filePath: `string` - The config file path

**Returns**: `object` - The new config object

```ts
config.load('path/to/config.json')
```

`clear`

Clear the current configuration and reset to default.

**Returns**: `void`

```ts
config.clear()
```

`print`

Prints the current configuration to the console.

**Returns**: `void`

```ts
config.print()
```

---

## `query`

`run`

Run the query on the data.

**Parameters**:
 - query: `string` - The query string to run
 - callback: `(result) => void` - The result callback

**Returns**: `void`

```ts
query.run("$.friends[?(@.age >= 18)]", (result) => {
  console.log(result)
})
```

`print`

Print the last executed query result to the console.

**Returns**: `void`

```ts
query.print()
```

`validate`

Validate the given query.

**Parameters**:
 - query: `string` - The query string to validate

**Returns**: `boolean` - Whether the query is valid or not

```ts
query.validate("$.friends[?(@.age >= 18)]")
```

`result`

Retrieve the result of the last executed query.

**Returns**: `unknown` - The result of last executed query

```ts
query.result
```
