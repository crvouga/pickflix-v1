import { RepositoryInMemory } from "../../unit-of-work/repository.in-memory";
import { Review } from "../models/make-review";
import { IReviewRepository } from "./types";
import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";

export class ReviewRepositoryInMemory
  extends RepositoryInMemory<Review>
  implements IReviewRepository {
  constructor() {
    super();
  }
}
export class ReviewRepositoryFileSystem
  extends RepositoryFileSystem<Review>
  implements IReviewRepository {
  constructor() {
    super("reviews");
  }
}
