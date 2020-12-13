import {
  AutoListRepositoryFileSystem,
  AutoListRepositoryHashMap,
} from "../../lists/repositories/auto-list-repository";
import { AutoListRepositoryPostgres } from "../../lists/repositories/auto-list-repository.postgres";
import {
  ListItemRepositoryFileSystem,
  ListItemRepositoryHashMap,
} from "../../lists/repositories/list-item-repository";
import { ListItemRepositoryPostgres } from "../../lists/repositories/list-item-repository.postgres";
import {
  ListRepositoryFileSystem,
  ListRepositoryHashMap,
} from "../../lists/repositories/list-repository";
import { ListRepositoryPostgres } from "../../lists/repositories/list-repository.postgres";
import {
  PermissionRepositoryFileSystem,
  PermissionRepositoryHashMap,
} from "../../lists/repositories/permission-repository";
import { PermissionRepositoryPostgres } from "../../lists/repositories/permission-repository.postgres";
import {
  TmdbDiscoverTagsRepositoryFileSystem,
  TmdbDiscoverTagsRepositoryHashMap,
} from "../../media/repositories/TmdbDiscoverTagsRepository";
import { TmdbDiscoverTagsRepositoryPostgres } from "../../media/repositories/TmdbDiscoverTagsRepository.postgres";
import {
  ReviewRepositoryFileSystem,
  ReviewRepositoryHashMap,
} from "../../reviews/repositories/review-repository";
import { ReviewRepositoryPostgres } from "../../reviews/repositories/review-repository.postgres";
import {
  ReviewVoteRepositoryFileSystem,
  ReviewVoteRepositoryHashMap,
} from "../../reviews/repositories/review-vote-repository";
import { ReviewVoteRepositoryPostgres } from "../../reviews/repositories/review-vote-repository.postgres";
import {
  CredentialRepositoryFileSystem,
  CredentialRepositoryHashMap,
} from "../../users/repositories/credential-repository";
import { CredentialRepositoryPostgres } from "../../users/repositories/credential-repository.postgres";
import {
  UserRepositoryFileSystem,
  UserRepositoryHashMap,
} from "../../users/repositories/user-repository";
import { UserRespositoryPostgres } from "../../users/repositories/user-respository.postgres";
import configuration from "../configuration";
import {
  IPostgresDatabase,
  PostgresDatabaseDeveloplment,
  PostgresDatabaseTest,
} from "../data-access/database.postgres";

export const buildRepositoriesHashMap = () => {
  const userRepository = new UserRepositoryHashMap();
  const credentialRepository = new CredentialRepositoryHashMap();

  const reviewRepository = new ReviewRepositoryHashMap({});
  const reviewVoteRepository = new ReviewVoteRepositoryHashMap({});

  const listRepository = new ListRepositoryHashMap();
  const listItemRepository = new ListItemRepositoryHashMap();
  const autoListRepository = new AutoListRepositoryHashMap();
  const permissionRepository = new PermissionRepositoryHashMap();

  const tmdbDiscoverTagsRepository = new TmdbDiscoverTagsRepositoryHashMap();

  const repositories = {
    tmdbDiscoverTagsRepository,
    permissionRepository,
    userRepository,
    credentialRepository,
    reviewRepository,
    reviewVoteRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
  };

  return {
    repositories,
  };
};

const makeFilePath = (name: string) =>
  `${configuration.PATH_TO_FILE_STORE}/${name}.json`;

export const buildRepositoriesFileSystem = async () => {
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
  const permissionRepository = new PermissionRepositoryFileSystem(
    makeFilePath("permissions")
  );

  const tmdbDiscoverTagsRepository = new TmdbDiscoverTagsRepositoryFileSystem(
    makeFilePath("tmdbDiscoverTags")
  );

  const repositories = {
    permissionRepository,
    userRepository,
    credentialRepository,
    reviewRepository,
    reviewVoteRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
    tmdbDiscoverTagsRepository,
  };

  return {
    repositories,
  };
};

export const buildRepositoriesPostgres = async (
  database: IPostgresDatabase
) => {
  const userRepository = new UserRespositoryPostgres(database);
  const credentialRepository = new CredentialRepositoryPostgres(database);
  const reviewRepository = new ReviewRepositoryPostgres(database);
  const reviewVoteRepository = new ReviewVoteRepositoryPostgres(database);
  const listRepository = new ListRepositoryPostgres(database);
  const listItemRepository = new ListItemRepositoryPostgres(database);
  const autoListRepository = new AutoListRepositoryPostgres(database);
  const permissionRepository = new PermissionRepositoryPostgres(database);
  const tmdbDiscoverTagsRepository = new TmdbDiscoverTagsRepositoryPostgres(
    database
  );

  const repositories = {
    tmdbDiscoverTagsRepository,
    permissionRepository,
    userRepository,
    credentialRepository,
    reviewRepository,
    reviewVoteRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
  };

  const initializeAllTables = async () => {
    await tmdbDiscoverTagsRepository.initializeTables();
    await userRepository.initializeTables();
    await credentialRepository.initializeTables();
    await reviewRepository.initializeTables();
    await reviewVoteRepository.initializeTables();
    await listRepository.initializeTables();
    await listItemRepository.initializeTables();
    await autoListRepository.initializeTables();
    await permissionRepository.initializeTables();
  };

  return {
    initializeAllTables,
    repositories,
  };
};

type RepositoryImplementation = "postgres" | "hashMap" | "fileSystem";

const castRepositoryImplementation = (
  repositoryImplementation: any
): RepositoryImplementation => {
  if (
    repositoryImplementation === "postgres" ||
    repositoryImplementation === "hashMap" ||
    repositoryImplementation === "fileSystem"
  ) {
    return repositoryImplementation;
  }
  throw new Error("failed to cast repository implementation");
};

const postgresDatabaseTest = new PostgresDatabaseTest();

const buildRepositoriesTest = async (
  repositoryImplementation: RepositoryImplementation
) => {
  switch (repositoryImplementation) {
    case "postgres":
      await postgresDatabaseTest.clearTables();
      const {
        repositories,
        initializeAllTables,
      } = await buildRepositoriesPostgres(postgresDatabaseTest);
      await initializeAllTables();
      return {
        repositories,
      };

    default:
      return buildRepositoriesHashMap();
  }
};

export const buildRepositoriesDependingOnTestEnvironment = async () => {
  const respositoryImplementation = castRepositoryImplementation(
    process.env.respositoryImplementation || "hashMap"
  );
  return buildRepositoriesTest(respositoryImplementation);
};

const postgresDatabaseDevelopment = new PostgresDatabaseDeveloplment();

const buildRepositoriesDevelopment = async (
  repositoryImplementation: RepositoryImplementation
) => {
  switch (repositoryImplementation) {
    case "postgres":
      const {
        repositories,
        initializeAllTables,
      } = await buildRepositoriesPostgres(postgresDatabaseDevelopment);
      await initializeAllTables();
      return {
        repositories,
      };

    case "fileSystem":
      return await buildRepositoriesFileSystem();

    default:
      return buildRepositoriesHashMap();
  }
};

export const buildRepositoriesDependingOnDevelopmentEnvironment = async () => {
  const respositoryImplementation = castRepositoryImplementation(
    process.env.respositoryImplementation || "fileSystem"
  );
  return buildRepositoriesDevelopment(respositoryImplementation);
};
