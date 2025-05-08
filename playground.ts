/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.scores[?( (@ > 150) || (@ < 100) )]");
query.print();
