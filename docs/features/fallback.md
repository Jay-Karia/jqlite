---
prev:
  text: Basic Selection
  link: /features/basic
next:
  text: Wildcard
  link: /features/wildcard
---

# Fallback

The fallback feature allows you to specify a default value to be returned when a query does not return any data

:::tip
You can set the fallback value in the `config` object as well.
:::

The fallback value in query will have a higher priority than the one in the config object.

## Fall Mark
The fall mark token `??` is used to define the fallback value inside the query. Everything after fall mark will be considered as fallback value

`$.user.phone ?? No phone provided`

## Return Value
The returned fallback value is not a `string`, but rather a `object`

```ts
{
  __fallback__: "Fallback value"
}
```

`query.result.__fallback__`

---

**Sample Data**
```json
{
  "name": "John",
  "favorites": {
    "color": "blue",
    "food": "pizza",
    "place": null
  }
}
```

**Queries**
```ts
query.run("$.favorites.game ?? No favorite game")
/*
 {
   __fallback__: 'No favorite game',
 }
*/
query.run("$.favorites.color ?? No favorite color") // "blue"
query.run("$.favorites.place ?? No favorite place") // null
```

:::info
If the value is `null`, it will be returned as is, not the fallback value.
:::
