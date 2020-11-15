import { EventEmitter } from "events";
import { EmailServiceStub } from "../../email/EmailService";
import { UnitOfWorkHashMap } from "../../unit-of-work/unit-of-work.fake";
import { UserLogic } from "./user-logic";

export const buildUserLogicFake = ({
  unitOfWork = new UnitOfWorkHashMap(),
  eventEmitter = new EventEmitter(),
} = {}) => {
  const emailService = new EmailServiceStub();

  const userLogic = new UserLogic({
    unitOfWork,
    eventEmitter,
    emailService,
  });

  return { userLogic, eventEmitter };
};
