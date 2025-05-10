/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/demo.json");

query.run("$.user.name.#equals('John Doe')");
query.print();
