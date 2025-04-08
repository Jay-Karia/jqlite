/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/sample.json");
query.run("$.animals[:2]");
