import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { AutoList } from "../models";
import { IAutoListRepository } from "./types";

export class AutoListRepositoryHashMap
  extends GenericRepositoryHashMap<AutoList>
  implements IAutoListRepository {
  constructor() {
    super();
  }
}

export class AutoListRepositoryFileSystem
  extends GenericRepositoryFileSystem<AutoList>
  implements IAutoListRepository {
  constructor() {
    super("autoLists");
  }
}
