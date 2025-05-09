# Comparison Operators

This feature allows you to compare two values using various operators.

:::warning
The comparing value should be a `number`. For string literals, you can use the `#equals()` function.
:::

**Available Operators**
| Operator | Description |
| -------- | ----------- |
| `==`     | Equal to     |
| `!=`     | Not equal to |
| `>`      | Greater than |
| `>=`     | Greater than or equal to |
| `<`      | Less than   |
| `<=`     | Less than or equal to |

### Sample Data
```json
{
  "age": 25,
  "height": 175
}
```

### Queries
```ts
// Check if age is greater than 18
query.run("$.age > 18") // true

// Check if height is less than or equal to 150
query.run("$.height <= 150") // false
```
