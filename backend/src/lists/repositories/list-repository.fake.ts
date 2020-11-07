import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";
import { RepositoryHashMap } from "../../unit-of-work/repository.hash-map";
import { List } from "../models/types";
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
