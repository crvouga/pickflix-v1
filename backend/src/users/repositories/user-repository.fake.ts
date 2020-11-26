import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { User } from "../models/make-user";
import { IUserRepository } from "./types";

export class UserRepositoryHashMap
  extends GenericRepositoryHashMap<User>
  implements IUserRepository {
  constructor() {
    super({});
  }
}

export class UserRepositoryFileSystem
  extends GenericRepositoryFileSystem<User>
  implements IUserRepository {
  constructor() {
    super("users");
  }
}
