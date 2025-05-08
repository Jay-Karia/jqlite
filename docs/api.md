# API Reference

| Component | Description |
| --------- | ----------- |
| `data`    | Defines the data source for the query. |
| `config`  | Defines the configuration for the query. |
| `query`   | Defines the query to be executed on the data. |

### **`data`**
The `data` component is used to define the data source for the query.

#### `get`
This method retrieves the current data source.

```ts
data.get()
```

#### `set`

This method sets the data source for the query.
```ts
data.set({
  "name": "John Doe",
  "age": 30,
  "city": "New York"
})

```

#### `clear`

This method clears the current data source.
```ts
data.clear()
```

#### `print`

This method prints the current data source to the console.
```ts
data.print()
```

#### `load`

This method loads data from a file.
```ts
data.load('path/to/file.json')
```

#### `fetch`
This method fetches data from a URL.

```ts
data.fetch('https://api.example.com/data')
```

---

### **`config`**
The `config` component is used to define the configuration for the query.

#### `get`
This method retrieves the current configuration.

```ts
config.get()
```

#### `set`
This method sets the configuration for the query.

```ts
config.set({
  fallback: "No data found",
  quotedArguments: false,
})
```

#### `clear`
This method clears the current configuration.

```ts
config.clear()
```

#### `print`
This method prints the current configuration to the console.

```ts
config.print()
```

#### `load`
This method loads configuration from a file.

```ts
config.load('path/to/config.json')
```

---

### **`query`**

The `query` component is used to define the query to be executed on the data.

#### `run`
This method runs the query on the data.

```ts
query.run("$.friends[?(@.age >= 18)]", (result) => {
  console.log(result)
})
```

#### `print`
This method prints the current query to the console.

```ts
query.print()
```

#### `validate`
This method validates the current query.

```ts
query.validate("$.friends[?(@.age >= 18)]")
```

#### `result`
This method retrieves the result of the last executed query.

```ts
query.result
```
