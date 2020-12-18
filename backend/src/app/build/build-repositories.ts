import {
  AutoListRepositoryFileSystem,
  AutoListRepositoryHashMap,
  AutoListRepositoryPostgres,
  ListItemRepositoryFileSystem,
  ListItemRepositoryHashMap,
  ListItemRepositoryPostgres,
  ListRepositoryFileSystem,
  ListRepositoryHashMap,
  ListRepositoryPostgres,
  PermissionRepositoryFileSystem,
  PermissionRepositoryHashMap,
  PermissionRepositoryPostgres,
} from "../../lists/repositories";
import {
  TmdbDiscoverTagsRepositoryFileSystem,
  TmdbDiscoverTagsRepositoryHashMap,
  TmdbDiscoverTagsRepositoryPostgres,
} from "../../media/repositories";
import {
  ReviewRepositoryFileSystem,
  ReviewRepositoryHashMap,
  ReviewRepositoryPostgres,
  ReviewVoteRepositoryFileSystem,
  ReviewVoteRepositoryHashMap,
  ReviewVoteRepositoryPostgres,
} from "../../reviews/repositories";
import {
  CredentialRepositoryFileSystem,
  CredentialRepositoryHashMap,
  CredentialRepositoryPostgres,
  UserRepositoryFileSystem,
  UserRepositoryHashMap,
  UserRespositoryPostgres,
} from "../../users/repositories";
import { IPostgresDatabase } from "../data-store/repository/postgres/database.postgres";

/* 


*/

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

/* 


*/

export const buildRepositoriesFileSystem = async (pathToFileStore: string) => {
  const path = (name: string) => `${pathToFileStore}/${name}.json`;

  const userRepository = new UserRepositoryFileSystem(path("users"));
  const credentialRepository = new CredentialRepositoryFileSystem(
    path("credentials")
  );
  const reviewRepository = new ReviewRepositoryFileSystem(path("reviews"));
  const reviewVoteRepository = new ReviewVoteRepositoryFileSystem(
    path("reviewVotes")
  );
  const listRepository = new ListRepositoryFileSystem(path("lists"));
  const listItemRepository = new ListItemRepositoryFileSystem(
    path("listItems")
  );
  const autoListRepository = new AutoListRepositoryFileSystem(
    path("autoLists")
  );
  const permissionRepository = new PermissionRepositoryFileSystem(
    path("permissions")
  );
  const tmdbDiscoverTagsRepository = new TmdbDiscoverTagsRepositoryFileSystem(
    path("tmdbDiscoverTags")
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

/* 


*/

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
