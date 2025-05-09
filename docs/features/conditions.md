# Conditions

This features allows to filter out array elements based on the specified conditions.

:::tip
Use `conditionFormat: "array" | "object"` config key to specify the return type of the condition. By default, it is set to `array`.
:::

## Declaration
The `?()` token inside brackets is used to declare conditions.

`$.users[?(@.age > 18)]`

## Context
The `@` context is used to refer to the each and every element in the array.

## Logical Conditions
Two logical operators `&&` and `||` are supported

`$.users[?((@.age >= 18) && (@.purchasedItems > 10))]`

## Parenthesis
Be careful while using logical conditions, **parenthesis are required!**

**Invalid**:
  - `$.users[?(@.age >= 18 && @.purchasedItems > 10)]`

---

**Sample Data**

```json
{
  "users": [
    {
      "name": "John",
      "age": 25
    },
    {
      "name": "Jane",
      "age": 30
    },
    {
      "name": "Doe",
      "age": 20
    }
  ]
}
```

**Queries**

```ts
// Get all users whose age is greater than 25
query.run("$.users[?(@.age > 25)]")
/*
[
  {
    "name": "Jane",
    "age": 30
  }
]
*/

// Using "object" in `conditionFormat`
query.run("$.users[?(@.age >= 25)]")
/*
 {
  "name": ["John", "Jane"],
  "age": [25, 30]
 }
*/
query.run("$.users[?(@.age >= 25)].name") // ["John", "Jane"]

// Logical Conditions
query.run("$.users[?((@.age > 25) && (@.name.#equals('Jane')))]")
/*
[
  {
    "name": "Jane",
    "age": 30
  }
]
*/

// Using unknown key
query.run("$.users[?(@.unknownKey)]") // Error
```

:::danger
While using logical operators (`&&` and `||`), make the sure to use parentheses `()` to group the conditions. Otherwise, it will throw an error.
:::
