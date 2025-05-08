# Array Slices

This features allows you to select array items from a specified range.

:::info
Slices works similar to the `Array.prototype.slice()`.
See [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) for more info
:::

**Sample Data**
```json
{
  "array": [1, 2, 3, 4, 5]
}
```

**Queries**
```ts
// Select first 3 items
query.run("$.array[:3]") // [1, 2, 3]

// Select last 3 items
query.run("$.array[-3:]") // [3, 4, 5]

// Select items from index 1 to 3
query.run("$.array[1:3]") // [2, 3]
```
