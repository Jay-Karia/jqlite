/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.friends[?(@.name.#contains('r'))]");
query.print();
