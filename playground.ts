/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.friends[*].name[1].#substring(0, 3).#contains('e')");
query.print();
