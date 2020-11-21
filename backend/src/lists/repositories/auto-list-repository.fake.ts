import { RepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { RepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { AutoList } from "../models";
import { IAutoListRepository } from "./types";

export class AutoListRepositoryHashMap
  extends RepositoryHashMap<AutoList>
  implements IAutoListRepository {
  constructor() {
    super();
  }
}

export class AutoListRepositoryFileSystem
  extends RepositoryFileSystem<AutoList>
  implements IAutoListRepository {
  constructor() {
    super("autoLists");
  }
}
