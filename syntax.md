```json
{
  "friends": [
    {
      "name": "Alice",
      "age": 30,
      "hobbies": ["reading", "hiking"]
    },
    {
      "name": "Bob",
      "age": 25,
      "hobbies": ["gaming", "cooking"]
    },
    {
      "name": "Jay",
      "age": 35,
      "hobbies": ["sports", "music"]
    }
  ],
  "me": {
    "name": "Charlie",
    "age": 28,
    "gender": "male",
    "hobbies": ["traveling", "coding"],
    "annualIncome": 50_00_00_000,
    "dateOfBirth": "1995-05-15"
  },
  "strikeRates": [120, 80, 90, 60, 150, 200]
}
```

`$.friends[0].name`  // "Alice" <br>
`$.me.age` // 28 <br>
`$.me.(name, age)` // ["Charlie", 28] <br>
`$.me.school ?? "No school"` // "No school" <br>
`$.friends[*].name` // ["Alice", "Bob", "Jay"] <br>
`$.friends[0:2].name` // ["Alice", "Bob"] <br>
`$.friends[?(@.age > 25)].name` // ["ALice", "Jay"] <br>
`$.strikeRates[?(@ > 100)]` // [120, 150, 200] <br>
`$.friends[?(@.hobbies[0] == "reading")].name` // ["Alice"] <br>
`$.friends[*].#max(@.age)` // 35 <br>
`$.friends[*].#sort(@.age).name` // ["Bob", "Alice", "Jay"] <br>
`$.me.name.#toUpperCase()` // "CHARLIE" <br>
`$.me.hobbies[0].#contains("travel")` // true <br>
`$.me.annualIncome.#add(1000000)` // 6000000 <br>
`$.me.dateOfBirth.#format("dd-mm-yy")` // "15-05-95" <br>
