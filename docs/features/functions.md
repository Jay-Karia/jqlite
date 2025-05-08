# Functions

The built-in functions are available to perform some of the common tasks.

:::info
**Category** is the type of input that the function accepts
:::

**Built-in Functions**

| Name       | Category          | Returns   | Description        | Arguments |
| ---------- | ----------------- | --------- | ------------------ | --------- |
| `min`        | Numeric Array     | Number   | Returns the minimum value from the array | none |
| `max`        | Numeric Array     | Number   | Returns the maximum value from the array | none |
| `avg`        | Numeric Array     | Number   | Returns the average value from the array | none |
| `sum`        | Numeric Array     | Number   | Returns the sum of the array | none |
| `count`      | Array             | Number   | Returns the number of elements in the array | none |
| `sort`       | Array             | Array             | Returns the sorted array | none |
| `reverse`    | Array             | Array             | Returns the reversed array | none |
| `unique`     | Array             | Array             | Returns the unique elements from the array | none |
| `contains`   | String            | Boolean | Returns true if the string contains the specified substring | `String` |
| `length`     | String            | Number   | Returns the length of the string | none |
| `substring`  | String            | String            | Returns the substring from the string | `Number` `Number` |
| `upper`      | String            | String            | Uppercase the string | none |
| `lower`      | String            | String            | Lowercase the string | none |
| `equals`     | String            | Boolean | Returns true if the two strings are equal | `String` |

**Sample Data**

```json
{
  "numbers": [1, 2, 3, 4, 5],
  "text": "Hello World",
  "array": ["apple", "banana", "apple", "orange"]
}
```

**Queries**
```ts
// Get the minimum value from the numbers array
query.run("$.number.#min()") // 1

// Count the number of elements in the array
query.run("$.array.#count()") // 3

// Check whether the string contains "World"
query.run("$.text.#contains('World')") // true

// Get the substring from the string
query.run("$.text.#substring(0, 5)") // Hello

```

:::tip
`quotedArguments` config option is used to specify whether the `string` arguments should be quoted or not. By default, it is set to `true`.
:::
