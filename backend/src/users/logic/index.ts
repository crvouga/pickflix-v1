import { emailService } from "../email";
import { eventEmitter } from "../../common/events";
import { unitOfWork } from "../../common/unit-of-work";
import { UserLogic } from "./user-logic";

export const userLogic = new UserLogic({
  emailService,
  eventEmitter,
  unitOfWork,
});
