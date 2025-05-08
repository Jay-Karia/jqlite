/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json")

query.run("$.orders[?(@.status.#equals('delivered'))][*].items");
query.print();
