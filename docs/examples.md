# Examples

**Using [`demo.json`](/public/demo.json) as data source**

---

Get the id of all the products.
```
$.products[*].id
```

Get all the skill levels of user
```
$.user.skills[*].level
```

Get the name of all customers
```
$.orders[*].customer[*].name
```

Get the minimum number of visitors
```
$.stats.visitors.#min()
```

Get the maximum revenue
```
$.stats.revenue.#max()
```

Filter the products which has a price greater than 1500.
```
$.products[?(@.price > 1500)]
```

Get the list of all products which has an average review more than 4
```
$.products[?(@.reviews.#avg() > 4)]
```

Get the list of all delivered items
```
$.orders[?(@.status.#equals('delivered'))][*].items
```
