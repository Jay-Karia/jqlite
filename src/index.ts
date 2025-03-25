import {dataStreamer} from "data/streamer";
import { configManager } from "./config/manager";
import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";

dataStreamer.streamFile("./data/2mb.json");
// TODO: add option to manually stream data

export { queryRunner, dataManager, configManager };
