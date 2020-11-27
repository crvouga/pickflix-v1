import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { AutoList } from "../models/make-auto-list";
import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";

export interface IAutoListRepository {
  find(spec: Partial<AutoList>): Promise<AutoList[]>;

  add(autoList: AutoList): void;

  count(spec: Partial<AutoList>): Promise<number>;
}

export class AutoListRepositoryHashMap implements IAutoListRepository {
  repository: GenericRepositoryHashMap<AutoList>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<AutoList>({});
  }

  async find(spec: Partial<AutoList>) {
    return this.repository.find(spec);
  }

  async add(autoList: AutoList) {
    this.repository.add([autoList]);
  }

  async count(spec: Partial<AutoList>) {
    return this.repository.count(spec);
  }
}

export class AutoListRepositoryFileSystem implements IAutoListRepository {
  repository: GenericRepositoryFileSystem<AutoList>;

  constructor() {
    this.repository = new GenericRepositoryFileSystem<AutoList>("autoLists");
  }

  async find(spec: Partial<AutoList>) {
    return this.repository.find(spec);
  }

  async add(autoList: AutoList) {
    this.repository.add([autoList]);
  }

  async count(spec: Partial<AutoList>) {
    return this.repository.count(spec);
  }
}
