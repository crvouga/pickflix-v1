import {
  AutoListRepositoryFileSystem,
  AutoListRepositoryHashMap,
} from "../../lists/repositories/auto-list-repository";
import {
  ListItemRepositoryFileSystem,
  ListItemRepositoryHashMap,
} from "../../lists/repositories/list-item-repository";
import {
  ListRepositoryFileSystem,
  ListRepositoryHashMap,
} from "../../lists/repositories/list-repository";
import {
  ReviewRepositoryFileSystem,
  ReviewRepositoryHashMap,
} from "../../reviews/repositories/review-repository";
import {
  ReviewVoteRepositoryFileSystem,
  ReviewVoteRepositoryHashMap,
} from "../../reviews/repositories/review-vote-repository";
import {
  CredentialRepositoryFileSystem,
  CredentialRepositoryHashMap,
} from "../../users/repositories/credential-repository";
import {
  UserRepositoryFileSystem,
  UserRepositoryHashMap,
} from "../../users/repositories/user-repository";
import configuration from "../configuration";

const makeFilePath = (name: string) =>
  `${configuration.PATH_TO_FILE_STORE}/${name}.json`;

export const buildRepositoriesFileSystem = () => {
  const userRepository = new UserRepositoryFileSystem(makeFilePath("users"));

  const credentialRepository = new CredentialRepositoryFileSystem(
    makeFilePath("credentials")
  );

  const reviewRepository = new ReviewRepositoryFileSystem(
    makeFilePath("reviews")
  );

  const reviewVoteRepository = new ReviewVoteRepositoryFileSystem(
    makeFilePath("reviewVotes")
  );

  const listRepository = new ListRepositoryFileSystem(makeFilePath("lists"));

  const listItemRepository = new ListItemRepositoryFileSystem(
    makeFilePath("listItems")
  );

  const autoListRepository = new AutoListRepositoryFileSystem(
    makeFilePath("autoLists")
  );

  return {
    userRepository,
    credentialRepository,
    reviewRepository,
    reviewVoteRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
  };
};

export const buildRepositoriesHashMap = () => {
  const userRepository = new UserRepositoryHashMap();

  const credentialRepository = new CredentialRepositoryHashMap();

  const reviewRepository = new ReviewRepositoryHashMap({});

  const reviewVoteRepository = new ReviewVoteRepositoryHashMap({});

  const listRepository = new ListRepositoryHashMap();

  const listItemRepository = new ListItemRepositoryHashMap();

  const autoListRepository = new AutoListRepositoryHashMap();

  return {
    userRepository,
    credentialRepository,
    reviewRepository,
    reviewVoteRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
  };
};
