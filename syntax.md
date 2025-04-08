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

- [ ] **Multiple Key Selection**

```js
$.user.(name, age, email) // Multiple keys (returns array)
```

- [ ] **Single Key Omission**

```js
$.me.about.!gender       // Returns object without gender
```

- [ ] **Multiple Key Omission**

```js
$.me.about.!(age, gender)  // Returns object without specified keys
```


- [ ] **Numeric Functions**

```js
#max()    // Maximum value
#min()    // Minimum value
#sum()    // Sum of values
#avg()    // Average of values
#count()  // Count of elements
```

- [ ] **String Functions**

```js
#contains()       // Check substring
#toUpperCase()    // Convert to uppercase
#toLowerCase()    // Convert to lowercase
#trim()           // Remove whitespace
#length()         // Get string length
#matches()        // Regex matching
```

- [ ] **Array Functions**

```js
#sort(@.field, "asc"/"dsc")  // Sort array of objects
#sort()                      // Sort array of primitives
#first()                     // First element
#last()                      // Last element
```

- [ ] **Math Functions**

```js
#add()   // Addition
#sub()   // Subtraction
#mul()   // Multiplication
#div()   // Division
#mod()   // Modulus
```

- [ ] **Date Functions**

```js
#format()    // Format date
#getYear()   // Get year
#getMonth()  // Get month
#getDay()    // Get day
```


- [ ] **Condition Filters**

```js
// Single condition
$.users[?(@.age > 18)]

// Multiple conditions
$.users[?(@.age > 18 && @.country == "USA")]
$.users[?(@.age > 18 || @.isAdmin == true)]
```

---
