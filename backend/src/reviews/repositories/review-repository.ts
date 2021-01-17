import { GenericRepositoryHashMap } from "../../app/persistence/generic-repository/generic-repository.hash-map";
import { GenericRepositoryQueryOptions } from "../../app/persistence/generic-repository/types";
import { Review, ReviewId } from "../models/make-review";
import { GenericRepositoryFileSystem } from "../../app/persistence/generic-repository/generic-repository.file-system";

export interface IReviewRepository {
  find(
    spec: Partial<Review>,
    options?: GenericRepositoryQueryOptions<Review>
  ): Promise<Review[]>;

  add(review: Review): void;

  remove(id: ReviewId): void;

  count(spec: Partial<Review>): Promise<number>;

  update(id: ReviewId, partial: Partial<Review>): void;
}

export class ReviewRepositoryHashMap implements IReviewRepository {
  repository: GenericRepositoryHashMap<ReviewId, Review>;

  constructor(hashMap: { [id: string]: Review }) {
    this.repository = new GenericRepositoryHashMap<ReviewId, Review>(hashMap);
  }

  async find(
    spec: Partial<Review>,
    options?: GenericRepositoryQueryOptions<Review>
  ) {
    return this.repository.find([spec], options);
  }

  async add(review: Review) {
    await this.repository.add([review]);
  }

  async remove(id: ReviewId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Review>) {
    return this.repository.count([spec]);
  }

  async update(id: ReviewId, partial: Partial<Review>) {
    await this.repository.update(id, partial);
  }
}

export class ReviewRepositoryFileSystem implements IReviewRepository {
  repository: GenericRepositoryFileSystem<ReviewId, Review>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<ReviewId, Review>(
      filePath
    );
  }

  async find(
    spec: Partial<Review>,
    options?: GenericRepositoryQueryOptions<Review>
  ) {
    return this.repository.find([spec], options);
  }

  async add(review: Review) {
    await this.repository.add([review]);
  }

  async remove(id: ReviewId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Review>) {
    return this.repository.count([spec]);
  }

  async update(id: ReviewId, partial: Partial<Review>) {
    await this.repository.update(id, partial);
  }
}
