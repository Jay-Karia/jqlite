/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json");
query.run("$.friends[*].name");
query.run("$.me.(name, age)");
query.run("$.me.!gender");
