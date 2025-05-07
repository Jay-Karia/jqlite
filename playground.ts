/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.scores[?( (@ > 120) && (@ < 100) )]");
query.print();

// TODO: condition groups
