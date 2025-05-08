# Multiple Key Selection

This features allows you to select multiple keys from an object using a single query.

**Sample Data**
```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}
```

**Queries**
```ts
query.run("$.(name, age)") // { name: "John Doe", age: 30 }
query.run("$.(name, address)") // Error
```

:::warning
If any one of the keys does not exist, it will throw an error.
:::
