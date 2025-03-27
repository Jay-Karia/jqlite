## 1. Basic Navigation

### Root Selector
```
$ or $.  // Root of the JSON document
```

### Object Property Access
```javascript
$.user.name               // Direct property access
$.user.address.city       // Nested property access
```

### Array Access
```javascript
$.users[0]                // First element
$.users[0,2,4]            // Multiple specific indices
$.users[*]                // Wildcard (all elements)
$.users[1:4]              // Slice from index 1 to 4
$.users[1:]               // From index 1 to end
$.users[:3]               // From start to index 3
$.users[-2:]              // Last two elements
```

## 2. Selection and Filtering

### Condition Filters
```javascript
// Single condition
$.users[?(@.age > 18)]

// Multiple conditions
$.users[?(@.age > 18 && @.country == "USA")]
$.users[?(@.age > 18 || @.isAdmin == true)]
```

### Logical Operators
- `&&` (AND)
- `||` (OR)
- `!` (NOT)
- Comparison: `==`, `!=`, `>`, `<`, `>=`, `<=`

## 3. Multiple Key Selection

```javascript
$.user.name               // Single key
$.user.(name, age, email) // Multiple keys (returns array)
```

## 4. Fallback Mechanism

```javascript
$.user.middleName ?? "N/A"                // Null coalescing
$.user.profile.bio ?? $.user.name ?? "Anonymous"  // Chained fallback
```

## 5. Omit Keys

### Single Key Omission
```javascript
$.me.about.!gender       // Returns object without gender
```

### Multiple Key Omission
```javascript
$.me.about.!(age, gender)  // Returns object without specified keys
```

## 6. Functions

### Numeric Functions
```javascript
#max()    // Maximum value
#min()    // Minimum value
#sum()    // Sum of values
#avg()    // Average of values
#count()  // Count of elements
```

### String Functions
```javascript
#contains()       // Check substring
#toUpperCase()    // Convert to uppercase
#toLowerCase()    // Convert to lowercase
#trim()           // Remove whitespace
#length()         // Get string length
#matches()        // Regex matching
```

### Array Functions
```javascript
#sort(@.field, "asc"/"dsc")  // Sort array of objects
#sort()                      // Sort array of primitives
#compact()                   // Remove null/undefined values
#unique()                    // Get unique values
#first()                     // First element
#last()                      // Last element
```

### Math Functions
```javascript
#add()   // Addition
#sub()   // Subtraction
#mul()   // Multiplication
#div()   // Division
#mod()   // Modulus
```

### Object Functions
```javascript
#keys()  // Get object keys
```

### Date Functions
```javascript
#format()    // Format date
#getYear()   // Get year
#getMonth()  // Get month
#getDay()    // Get day
```

## 7. Regex Matching

```javascript
// Match names starting with 'J'
$.friends[?(@.hobbies.#matches("\\"))]
```

### Advanced Query Examples

```javascript
// Find adult users in USA, sorted by age, first 5 results
$.users[?(@.age >= 18 && @.country == "USA")]
    .#sort(@.age)
    [0:5]
    .(name, age, email)

// Get unique skills across all users
$.users[*].skills.#unique()

// Complex nested filtering
$.organizations[?(@.employees[*].#max(@.salary) > 100000)]
```

---
