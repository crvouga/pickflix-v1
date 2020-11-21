import { mediaLogic } from "../../media/logic";
import { unitOfWork } from "../../common/unit-of-work";
import { ListLogic } from "./build";

export const listLogic = new ListLogic({
  mediaLogic,
  unitOfWork,
});
