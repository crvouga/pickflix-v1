import { RepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { RepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { List } from "../models";
import { IListRepository } from "./types";

export class ListRepositoryHashMap
  extends RepositoryHashMap<List>
  implements IListRepository {
  constructor() {
    super();
  }
}

export class ListRepositoryFileSystem
  extends RepositoryFileSystem<List>
  implements IListRepository {
  constructor() {
    super("lists");
  }
}
