- [x] **Root Selector**

```
$ or $.  // Root of the JSON document
```

- [x] **Object Property Access**

```javascript
$.user.name; // Direct property access
$.user.address.city; // Nested property access
```

- [x] **Basic Array Access**

```javascript
$.users[0]; // First element
```

- [ ] **Wildcard Array Access**

```javascript
$.users[*]                // Wildcard (all elements)
```

- [ ] **Array Slices**

```javascript
$.users[1:4]              // Slice from index 1 to 4
$.users[1:]               // From index 1 to end
$.users[:3]               // From start to index 3
$.users[-2:]              // Last two elements
```

- [ ] **Condition Filters**

```javascript
// Single condition
$.users[?(@.age > 18)]

// Multiple conditions
$.users[?(@.age > 18 && @.country == "USA")]
$.users[?(@.age > 18 || @.isAdmin == true)]
```

- [ ] **Multiple Key Selection**

```javascript
$.user.name               // Single key
$.user.(name, age, email) // Multiple keys (returns array)
```

- [ ] **Fallback Mechanism**

```javascript
$.user.middleName ?? "N/A"; // Null coalescing
```

- [ ] **Omission**

```javascript
$.me.about.!gender       // Returns object without gender
$.me.about.!(age, gender)  // Returns object without specified keys
```

- [ ] **Numeric Functions**

```javascript
#max()    // Maximum value
#min()    // Minimum value
#sum()    // Sum of values
#avg()    // Average of values
#count()  // Count of elements
```

- [ ] **String Functions**

```javascript
#contains()       // Check substring
#toUpperCase()    // Convert to uppercase
#toLowerCase()    // Convert to lowercase
#trim()           // Remove whitespace
#length()         // Get string length
#matches()        // Regex matching
```

- [ ] **Array Functions**

```javascript
#sort(@.field, "asc"/"dsc")  // Sort array of objects
#sort()                      // Sort array of primitives
#first()                     // First element
#last()                      // Last element
```

- [ ] **Math Functions**

```javascript
#add()   // Addition
#sub()   // Subtraction
#mul()   // Multiplication
#div()   // Division
#mod()   // Modulus
```

- [ ] **Date Functions**

```javascript
#format()    // Format date
#getYear()   // Get year
#getMonth()  // Get month
#getDay()    // Get day
```

---
