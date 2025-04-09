/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json");

query.run("$.me.!(name, age)", (result => {
  console.log(result);
}));

query.run("$.me", (result => {
  console.log(result);
}));
