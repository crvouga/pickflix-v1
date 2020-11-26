import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { Review } from "../models/make-review";
import { IReviewRepository } from "./types";
import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export class ReviewRepositoryHashMap
  extends GenericRepositoryHashMap<Review>
  implements IReviewRepository {
  constructor() {
    super();
  }
}
export class ReviewRepositoryFileSystem
  extends GenericRepositoryFileSystem<Review>
  implements IReviewRepository {
  constructor() {
    super("reviews");
  }
}
