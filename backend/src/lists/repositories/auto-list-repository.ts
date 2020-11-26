import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { AutoList } from "../models/make-auto-list";
import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export interface IAutoListRepository {
  find(spec: Partial<AutoList>): Promise<AutoList[]>;

  add(autoList: AutoList): void;
}

export class AutoListRepositoryHashMap implements IAutoListRepository {
  repository: GenericRepositoryHashMap<AutoList>;

  constructor(repository: GenericRepositoryHashMap<AutoList>) {
    this.repository = repository;
  }

  async find(spec: Partial<AutoList>) {
    return this.repository.find(spec);
  }

  async add(autoList: AutoList) {
    this.repository.add([autoList]);
  }
}

export class AutoListRepositoryFileSystem implements IAutoListRepository {
  repository: GenericRepositoryFileSystem<AutoList>;

  constructor(repository: GenericRepositoryFileSystem<AutoList>) {
    this.repository = repository;
  }

  async find(spec: Partial<AutoList>) {
    return this.repository.find(spec);
  }

  async add(autoList: AutoList) {
    this.repository.add([autoList]);
  }
}
