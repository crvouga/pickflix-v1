import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";
import { RepositoryHashMap } from "../../unit-of-work/repository.hash-map";
import { User } from "../models/make-user";
import { IUserRepository } from "./types";

export class UserRepositoryFileSystem
  extends RepositoryFileSystem<User>
  implements IUserRepository {
  constructor() {
    super("users");
  }
}

export class UserRepositoryHashMap
  extends RepositoryHashMap<User>
  implements IUserRepository {
  constructor() {
    super();
  }
}
