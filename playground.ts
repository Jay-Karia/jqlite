/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json");

// Name of all products in stock
query.run("$.nothing ?? Nothing found")
query.print();
