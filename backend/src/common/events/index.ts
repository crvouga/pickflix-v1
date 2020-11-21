import { listLogic } from "../../lists/logic";
import { buildEventEmitter } from "./build";
export * from "./types";
export const eventEmitter = buildEventEmitter({
  listLogic,
});
