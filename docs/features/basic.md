# Basic Selection

Select data from a JSON object and index arrays.

## Root Selector
Every JQLite query starts with a root selector `$` that represents the entire JSON document.

`$`

## Property Access
Access object properties dot notation

`$.propertyName`

## Array Access
Index array elements using brackets.

`$.users[0]`

---

**Sample Data**
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

**Queries**
```ts
query.run("$.name") // "John"
query.run("$.address.street") // "123 Main St"
query.run("$.hobbies[0]") // "reading"
```
