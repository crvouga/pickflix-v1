import {
  AutoListRepositoryHashMap,
  AutoListRepositoryFileSystem,
} from "../../lists/repositories/auto-list-repository.fake";
import {
  ListItemRepositoryHashMap,
  ListItemRepositoryFileSystem,
} from "../../lists/repositories/list-item-repository.fake";
import {
  ListRepositoryHashMap,
  ListRepositoryFileSystem,
} from "../../lists/repositories/list-repository.fake";
import {
  ReviewRepositoryHashMap,
  ReviewRepositoryFileSystem,
} from "../../reviews/repositories/review-repository.fake";
import {
  ReviewVoteRepositoryHashMap,
  ReviewVoteRepositoryFileSystem,
} from "../../reviews/repositories/review-vote-repository.fake";
import {
  CredentialRepositoryHashMap,
  CredentialRepositoryFileSystem,
} from "../../users/repositories/credential-repository.fake";
import {
  UserRepositoryHashMap,
  UserRepositoryFileSystem,
} from "../../users/repositories/user-repository.fake";
import { IUnitOfWork } from "./types";

export class UnitOfWorkFileSystem implements IUnitOfWork {
  Lists: ListRepositoryFileSystem;
  ListItems: ListItemRepositoryFileSystem;
  AutoLists: AutoListRepositoryFileSystem;
  Reviews: ReviewRepositoryFileSystem;
  ReviewVotes: ReviewVoteRepositoryFileSystem;
  Users: UserRepositoryFileSystem;
  Credentials: CredentialRepositoryFileSystem;

  constructor() {
    this.ListItems = new ListItemRepositoryFileSystem();
    this.AutoLists = new AutoListRepositoryFileSystem();
    this.Reviews = new ReviewRepositoryFileSystem();
    this.ReviewVotes = new ReviewVoteRepositoryFileSystem();
    this.Lists = new ListRepositoryFileSystem();
    this.Users = new UserRepositoryFileSystem();
    this.Credentials = new CredentialRepositoryFileSystem();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}

export class UnitOfWorkHashMap implements IUnitOfWork {
  AutoLists: AutoListRepositoryHashMap;
  Lists: ListRepositoryHashMap;
  ListItems: ListItemRepositoryHashMap;
  Users: UserRepositoryHashMap;
  Credentials: CredentialRepositoryHashMap;
  Reviews: ReviewRepositoryHashMap;
  ReviewVotes: ReviewVoteRepositoryHashMap;

  constructor() {
    this.Lists = new ListRepositoryHashMap();
    this.ListItems = new ListItemRepositoryHashMap();
    this.AutoLists = new AutoListRepositoryHashMap();
    this.Reviews = new ReviewRepositoryHashMap();
    this.ReviewVotes = new ReviewVoteRepositoryHashMap();
    this.Users = new UserRepositoryHashMap();
    this.Credentials = new CredentialRepositoryHashMap();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}
