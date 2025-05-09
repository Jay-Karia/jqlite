# Wildcard

This feature allows you to select all the keys inside an array.

:::danger
The key used should be an **array of objects**
:::

### Sample Data
```json
{
  "friends": [
    {
      "name": "John",
      "age": 30,
      "city": "New York",
      "hobbies": [
        "reading",
        "gaming"
      ]
    },
    {
      "name": "Jane",
      "age": 25,
      "city": "Los Angeles"
    }
  ],
  "scores": [120, 100, 80, 70]
}
```

### Queries
```ts
query.run("$.friends[*]")
/*
  {
    name: ["John", "Jane"],
    age: [30, 25],
    city: ["New York", "Los Angeles"]
    hobbies: [["reading", "gaming"], []]
  }
*/

query.run("$.friends[*].name") // ["John", "Jane"]
query.run("$.scores[*]") // Error
```

:::info
Note that the missing key `hobbies` in the second object is returned as an empty array.
:::
