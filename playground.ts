/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json");

query.run("$.friends[?(@.age > 15)][1].name[1]")
query.print();
