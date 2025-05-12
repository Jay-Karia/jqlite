/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json");

query.run("$.products[?(@.price < 2000)].#count()");
console.log(query.result);
