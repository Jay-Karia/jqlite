import { EventManager } from "./eventManager";
import {registerCacheHooks} from "./implementations/cacheHooks";
import {registerConfigHooks} from "./implementations/configHooks";
import {registerDataHooks} from "./implementations/dataHooks";

const eventManager = new EventManager();

registerDataHooks(eventManager);
registerCacheHooks(eventManager);
registerConfigHooks(eventManager);

export { eventManager };
