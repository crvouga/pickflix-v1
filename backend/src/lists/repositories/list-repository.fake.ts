import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { List } from "../models";
import { IListRepository } from "./types";

export class ListRepositoryHashMap
  extends GenericRepositoryHashMap<List>
  implements IListRepository {
  constructor() {
    super({});
  }
}

export class ListRepositoryFileSystem
  extends GenericRepositoryFileSystem<List>
  implements IListRepository {
  constructor() {
    super("lists");
  }
}
