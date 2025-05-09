---
prev:
  text: Array Slices
  link: /features/slices
next:
  text: Key Omission
  link: /features/omission
---

# Multiple Key Selection

This features allows you to select multiple keys from an object.

## Parenthesis
Use parenthesis `()` to group property names inside.

`$.(users, employees)`

## Property Spacing
Be careful with spacing between the property names.

**Invalid**:
- `$.(users,employees)`
- `$.(users,employees )`
- `$.( users,employees)`
- `$.(users ,employees)`

---

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

:::danger
If any one of the keys does not exist, it will throw an error.
:::
