- [x] **Root Selector**

```js
$ // Root of the JSON document
```

- [x] **Object Property Access**

```js
$.user.name; // Direct property access
$.user.address.city; // Nested property access
```

- [x] **Basic Array Access**

```js
$.users[0]; // First element
```


- [x] **Fallback Mechanism**

```js
$.user.middleName ?? N/A;
```

- [x] **Wildcard Array Access**

```js
$.users[*]                // Wildcard (all elements)
$.friends[*].name         // All names in friends array
```

- [x] **Array Slices**

```js
$.users[1:4]              // Slice from index 1 to 4
$.users[1:]               // From index 1 to end
$.users[:3]               // From start to index 3
```

- [x] **Multiple Key Selection**

```js
$.user.(name, age, email) // Multiple keys (returns array)
```

- [x] **Single Key Omission**

```js
$.me.about.!gender       // Returns object without gender
```

- [x] **Multiple Key Omission**

```js
$.me.about.!(age, gender)  // Returns object without specified keys
```


- [x] **Numeric Array Functions**

```js
#max()    // Maximum value
#min()    // Minimum value
#sum()    // Sum of values
#avg()    // Average of values
```

- [x] **String Functions**

```js
#contains()       // Check substring
#length()         // Get string length
#substring()      // Get substring
#upper()          // Convert to uppercase
#lower()          // Convert to lowercase
```

- [x] **Array Functions**

```js
#sort(asc/desc)               // Sort array
#count()                     // Count of elements
#unique()                    // Unique elements
#reverse()                  // Reverse array
```

- [x] **Comparison Operators**

```js
$.me.age > 18
$.me.age >= 18
$.me.age < 18
$.me.age <= 18
$.me.age == 18
$.me.age != 18
```

- [ ] **Conditions**

```js
$.users[?(@.age > 18)] // Returns the array OR like wildcard (configurable)
$.users[?(@.age > 18 && @.country.#contains('IN'))].name // Returns the names of users who fulfills the condition and if the return type is set to wildcard like.
```

---
