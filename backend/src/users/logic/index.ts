import { emailService } from "../email";
import { eventEmitter } from "../../common/events";
import { unitOfWork } from "../../common/unit-of-work";
import { UserLogic } from "./logic";

export const userLogic = new UserLogic({
  emailService,
  eventEmitter,
  unitOfWork,
});
