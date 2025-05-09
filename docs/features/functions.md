---
prev:
  text: Key Omission
  link: /features/omission
next:
  text: Comparison Operators
  link: /features/comparison
---

# Functions

The built-in functions are available to perform some of the common tasks.

:::tip
`quotedArguments` config option is used to specify whether the `string` arguments should be quoted or not. By default, it is set to `true`.
:::

## Declaration
The hashtag token `#` is used as function declaration.

`$.products[0].reviews.#avg()`

## Argument Spacing
Be careful with the spacing between the arguments.

**Invalid**:
 - `$.users[0].name.#substring(1,2)`
 - `$.users[0].name.#substring(1, 2 )`
 - `$.users[0].name.#substring( 1, 2)`
 - `$.users[0].name.#substring(1 , 2)`

---

## Built-in Functions

| Name       | Category          | Returns   | Description        | Arguments |
| ---------- | ----------------- | --------- | ------------------ | --------- |
| `min`        | Numeric Array     | Number   | Returns the minimum value from the array | none |
| `max`        | Numeric Array     | Number   | Returns the maximum value from the array | none |
| `avg`        | Numeric Array     | Number   | Returns the average value from the array | none |
| `sum`        | Numeric Array     | Number   | Returns the sum of the array elements | none |
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

:::info
**Category** is the type of input that the function accepts
:::

---

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
query.run("$.numbers.#min()") // 1

// Count the number of elements in the array
query.run("$.array.#count()") // 4

// Check whether the string contains "World"
query.run("$.text.#contains('World')") // true

// Get the substring from the string
query.run("$.text.#substring(0, 5)") // Hello

```
