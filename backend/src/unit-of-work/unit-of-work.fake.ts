import {LikeRepositoryInMemory} from '../likes/repositories/like-repository.fake';
import {AutoListRepositoryInMemory} from '../lists/repositories/auto-list-repository.fake';
import {ListItemRepositoryInMemory} from '../lists/repositories/list-item-repository.fake';
import {
  ListRepositoryInMemory,
  ListRepositoryFileSystem,
} from '../lists/repositories/list-repository.fake';
import {ReviewRepositoryInMemory} from '../reviews/repositories/review-repository.fake';
import {ReviewVoteRepositoryInMemory} from '../reviews/repositories/review-vote-repository.fake';
import {
  CredentialRepositoryInMemory,
  CredentialRepositoryFileSystem,
} from '../users/repositories/credential-repository.fake';
import {
  UserRepositoryInMemory,
  UserRepositoryFileSystem,
} from '../users/repositories/user-repository.fake';
import {IUnitOfWork} from './types';

export class UnitOfWorkDev implements IUnitOfWork {
  Lists: ListRepositoryFileSystem;
  ListItems: ListItemRepositoryInMemory;
  Likes: LikeRepositoryInMemory;
  AutoLists: AutoListRepositoryInMemory;
  Reviews: ReviewRepositoryInMemory;
  ReviewVotes: ReviewVoteRepositoryInMemory;

  Users: UserRepositoryFileSystem;
  Credentials: CredentialRepositoryFileSystem;

  constructor() {
    this.ListItems = new ListItemRepositoryInMemory();
    this.Likes = new LikeRepositoryInMemory();
    this.AutoLists = new AutoListRepositoryInMemory();
    this.Reviews = new ReviewRepositoryInMemory();
    this.ReviewVotes = new ReviewVoteRepositoryInMemory();
    //
    this.Lists = new ListRepositoryFileSystem();
    this.Users = new UserRepositoryFileSystem();
    this.Credentials = new CredentialRepositoryFileSystem();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}

export class UnitOfWorkInMemory implements IUnitOfWork {
  Lists: ListRepositoryInMemory;
  ListItems: ListItemRepositoryInMemory;
  Users: UserRepositoryInMemory;
  Likes: LikeRepositoryInMemory;
  AutoLists: AutoListRepositoryInMemory;
  Reviews: ReviewRepositoryInMemory;
  ReviewVotes: ReviewVoteRepositoryInMemory;
  Credentials: CredentialRepositoryInMemory;

  constructor() {
    this.Lists = new ListRepositoryInMemory();
    this.ListItems = new ListItemRepositoryInMemory();
    this.Likes = new LikeRepositoryInMemory();
    this.AutoLists = new AutoListRepositoryInMemory();
    this.Reviews = new ReviewRepositoryInMemory();
    this.ReviewVotes = new ReviewVoteRepositoryInMemory();
    this.Users = new UserRepositoryInMemory();
    this.Credentials = new CredentialRepositoryInMemory();
  }

  async begin() {}
  async commit() {}
  async rollback() {}
}
