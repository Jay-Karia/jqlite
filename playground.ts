/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json")

query.run("$.scores[?((@ >= 100) && (@ <= 150))]");
query.print();
