# Key Omission

This feature allows you to omit single/multiple keys from an object using a single query.

### Sample Data
```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "gender": "Male"
}
```

### Queries
```ts
// Omit single key
query.run("$.!gender")
/*
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
  }
*/

// Omit multiple keys
query.run("$.!(gender, age)")
/*
  {
    "name": "John Doe",
    "city": "New York"
  }
*/

query.run("$.!(name, address)")
/*
 {
    "age": 30,
    "city": "New York",
    "gender": "Male"
 }
*/
```

:::info
It will not throw an error if the key does not exist in the object.
:::
