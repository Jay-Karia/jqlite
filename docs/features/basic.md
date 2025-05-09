# Basic Selection

The basic selection syntax is simple and intuitive. You can select data from a JSON object using the dot notation or bracket notation.

### Sample Data
```json
{
  "name": "John",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "traveling"],
  "address": {
    "street": "123 Main St",
    "zip": "10001"
  }
}
```

### Queries
```ts
query.run("$.name") // "John"
query.run("$.address.street") // "123 Main St"
query.run("$.hobbies[0]") // "reading"
```
