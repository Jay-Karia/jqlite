# Configurations

:::info
It will check for `jqlite.json` file in the root folder. If it exists, it will be used to override the default config.
:::

**Options**
| Option | Description | Type | Default |
| ------ | ----------- | ---- | ------- |
| `loadFile` | The path to json file to load. | `string` | `null` |
| `fetchUrl` | The url to fetch the json from. | `string` | `null` |
| `fallback` | The fallback value to use | `string` | `null` |
| `quotedArguments` | Specify whether to use quotes in string arguments | `boolean` | `true` |
| `conditionFormat` | The return format from conditions | `"array", "object"` | `"array"` |

## `loadFile`

Used when no argument is passed in [`data.load()`](/api#load) function, file path specified in the config will be used.

If path is neither specified in config nor in function, it will throw an error.

## `fetchUrl`

Used when no argument is passed in [`data.fetch()`](/api#fetch) function, url specified in the config will be used.

If url is neither specified in config nor in function, it will throw an error.

## `fallback`

If the key is not found in the json file, the fallback value will be used.

:::info
The fallback value provided in query has higher priority, and will overwrite the fallback value from config.
:::

## `quotedArguments`

Specifies whether to use quotes in string arguments.

If set to `false`, you can pass arguments without quotes.
```ts
query.run("$.user.name.#contains(a)") // Valid
query.run("$.user.name.#contains('a')") // Valid
```

If set to `true`, you must pass arguments with quotes.
```ts
query.run("$.user.name.#contains(a)") // Invalid (throws error)
query.run("$.user.name.#contains('a')") // Valid
```

## `conditionFormat`

Specifies the return format from conditions.

If set to `array`, the return value will be an array of objects.
```ts
query.run("$.friends[?(@.age >= 18)]")
/*
  [
    {
      name: "Jane",
      age: 20
    },
    {
      name: "John",
      age: 25
    }
  ]
*/
```

If set to `object`, the return value will be an object
```ts
query.run("$.friends[?(@.age >= 18)]")
/*
  {
    name: ["Jane", "John"],
    age: [20, 25]
  }
*/
```
