/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.scores[?( ((@ > 80) && (@ < 100)) || (@ >= 120) )]");
query.print();
