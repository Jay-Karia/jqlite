/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json")

query.run("$.stats.revenue.#max()");
query.print();
