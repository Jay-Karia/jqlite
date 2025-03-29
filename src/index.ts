import { config } from "./config/manager";
import { query } from "./core/runner";
import { data } from "./data/manager";

query.run("$.friends[0].name");

export { query, data, config };
