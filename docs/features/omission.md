---
prev:
  text: Multiple Key Selection
  link: /features/selection
next:
  text: Functions
  link: /features/functions
---

# Key Omission

This feature allows you to omit single/multiple keys from an object.

## Not
The not token `!` is used to omit a single key.
Not token with parenthesis `!()` is used to omit multiple keys.

`$.!users`

`$.!(users, employees)`

## Property Spacing
Be careful with spacing between the property names.

See [Multiple Select](/features/selection#spacing) for more info.

---

**Sample Data**
```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "gender": "Male"
}
```

**Queries**
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

:::warning
It will not throw an error if the key does not exist in the object.
:::
