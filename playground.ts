/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.friends[?(@.hobbies[0].#contains('s'))][*].name");
query.print();
