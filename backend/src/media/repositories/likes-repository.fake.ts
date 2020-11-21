import { RepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { Entity } from "../models/types";
import { ILikesRepository } from "./types";

export class LikesRepositoryHashMap
  extends RepositoryHashMap<Entity>
  implements ILikesRepository {
  constructor() {
    super();
  }
}
