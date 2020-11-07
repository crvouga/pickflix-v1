import { RepositoryHashMap } from "../../unit-of-work/repository.hash-map";
import { Review } from "../models/make-review";
import { IReviewRepository } from "./types";
import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";

export class ReviewRepositoryHashMap
  extends RepositoryHashMap<Review>
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
