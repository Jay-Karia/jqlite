/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json");

query.run("$.products[?(@.price < 1000)].#sum()");
console.log(query.result);
