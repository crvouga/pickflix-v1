import { emailLogicStub } from "../../app/email";
import { createEventEmitter, Events } from "../../app/events";
import { AutoListRepositoryHashMap } from "../../lists/repositories/auto-list-repository";
import { ListRepositoryHashMap } from "../../lists/repositories/list-repository";
import { ReviewRepositoryHashMap } from "../../reviews/repositories/review-repository";
import { CredentialRepositoryHashMap } from "../repositories/credential-repository";
import { UserRepositoryHashMap } from "../repositories/user-repository";
import { UserLogic } from "./logic";
import { PermissionRepositoryHashMap } from "../../lists/repositories/permission-repository";

export const buildUserLogicTest = () => {
  const eventEmitter = createEventEmitter<Events>();
  const emailLogic = emailLogicStub;
  const credentialRepository = new CredentialRepositoryHashMap();
  const userRepository = new UserRepositoryHashMap();
  const listRepository = new ListRepositoryHashMap();
  const autoListRepository = new AutoListRepositoryHashMap();
  const reviewRepository = new ReviewRepositoryHashMap({});
  const permissionRepository = new PermissionRepositoryHashMap();
  const userLogic = new UserLogic({
    eventEmitter,
    emailLogic,
    userRepository,
    listRepository,
    autoListRepository,
    reviewRepository,
    credentialRepository,
    permissionRepository,
  });

  return { userLogic, eventEmitter };
};
