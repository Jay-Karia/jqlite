# Fallback

The fallback feature allows you to specify a default value to be returned when a query does not match any data.

:::tip
You can set the fallback value in the `config` object as well. The fallback value in the query will have a higher priority.
:::

### Sample Data
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

### Queries
```ts
query.run("$.favorites.game ?? 'No favorite game'")
/*
 {
   __fallback__: 'No favorite game',
 }
*/
query.run("$.favorites.color ?? 'No favorite color'") // "blue"
query.run("$.favorites.place ?? 'No favorite place'") // null
```

:::info
If the value is `null`, it will be returned as `null` and not the fallback value.
:::
