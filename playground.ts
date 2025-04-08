/* eslint-disable */

import { config, data, query } from "./src/index";

data.load("./data/nest.json");
query.run("$.users[*].favorites[0][1].game");
