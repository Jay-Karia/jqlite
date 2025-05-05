/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.friends[?(@.age > 18)]");
// query.print();
