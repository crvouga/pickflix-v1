import { EventEmitter } from "events";
import {
  AutoListRepositoryFileSystem,
  AutoListRepositoryHashMap,
} from "../../lists/repositories/auto-list-repository";
import {
  ListRepositoryFileSystem,
  ListRepositoryHashMap,
} from "../../lists/repositories/list-repository";
import {
  ReviewRepositoryFileSystem,
  ReviewRepositoryHashMap,
} from "../../reviews/repositories/review-repository";
import { buildEmailLogicTest, IEmailLogic } from "../email";
import {
  CredentialRepositoryFileSystem,
  CredentialRepositoryHashMap,
} from "../repositories/credential-repository";
import {
  UserRepositoryFileSystem,
  UserRepositoryHashMap,
} from "../repositories/user-repository";
import { UserLogic } from "./logic";

export const buildUserLogicTest = ({
  eventEmitter = new EventEmitter(),
} = {}) => {
  const emailLogic = buildEmailLogicTest();
  const credentialRepository = new CredentialRepositoryHashMap();
  const userRepository = new UserRepositoryHashMap();
  const listRepository = new ListRepositoryHashMap();
  const autoListRepository = new AutoListRepositoryHashMap();
  const reviewRepository = new ReviewRepositoryHashMap({});

  const userLogic = new UserLogic({
    eventEmitter,
    emailLogic,
    userRepository,
    listRepository,
    autoListRepository,
    reviewRepository,
    credentialRepository,
  });

  return { userLogic, eventEmitter };
};

export const buildUserLogicDevelopment = ({
  emailLogic,
  eventEmitter,
}: {
  emailLogic: IEmailLogic;
  eventEmitter: EventEmitter;
}) => {
  const credentialRepository = new CredentialRepositoryFileSystem();
  const userRepository = new UserRepositoryFileSystem();
  const listRepository = new ListRepositoryFileSystem();
  const autoListRepository = new AutoListRepositoryFileSystem();
  const reviewRepository = new ReviewRepositoryFileSystem();

  const userLogic = new UserLogic({
    eventEmitter,
    emailLogic,
    userRepository,
    listRepository,
    autoListRepository,
    reviewRepository,
    credentialRepository,
  });

  return userLogic;
};

export const buildUserLogicProduction = ({
  emailLogic,
  eventEmitter,
}: {
  emailLogic: IEmailLogic;
  eventEmitter: EventEmitter;
}) => {
  return buildUserLogicDevelopment({
    emailLogic,
    eventEmitter,
  });
};
