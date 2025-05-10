/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json");

query.run("$.products.#reverse()");
console.log(query.result);
