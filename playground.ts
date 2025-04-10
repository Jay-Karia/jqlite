/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json");

query.run("$.me.name.#substring(0, 2)");
query.print();
