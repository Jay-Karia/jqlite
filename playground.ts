/* eslint-disable */

import { config, data, query } from "./src/index";

data.set({
  "age": 25,
  "height": 175
})

// Check if age is greater than 18
query.run("$.age > 18") // true
query.print();

// Check if height is less than or equal to 150
query.run("$.height <= 150") // false
query.print();
