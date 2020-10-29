import { emailService } from "../../email";
import { eventEmitter } from "../../events";
import { unitOfWork } from "../../unit-of-work";
import { UserLogic } from "./user-logic";

export const userLogic = new UserLogic({
  emailService,
  eventEmitter,
  unitOfWork,
});
