import { GenericRepositoryHashMap } from "../../app/data-store/repository/generic-repository.hash-map";
import { AutoList } from "../models/make-auto-list";
import { GenericRepositoryFileSystem } from "../../app/data-store/repository/generic-repository.file-system";
import { ListId } from "../models";

export interface IAutoListRepository {
  find(spec: Partial<AutoList>): Promise<AutoList[]>;

  add(autoList: AutoList): void;

  count(spec: Partial<AutoList>): Promise<number>;
}

export class AutoListRepositoryHashMap implements IAutoListRepository {
  repository: GenericRepositoryHashMap<ListId, AutoList>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<ListId, AutoList>({});
  }

  async find(spec: Partial<AutoList>) {
    return this.repository.find([spec]);
  }

  async add(autoList: AutoList) {
    this.repository.add([autoList]);
  }

  async count(spec: Partial<AutoList>) {
    return this.repository.count([spec]);
  }
}

export class AutoListRepositoryFileSystem implements IAutoListRepository {
  repository: GenericRepositoryFileSystem<ListId, AutoList>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<ListId, AutoList>(
      filePath
    );
  }

  async find(spec: Partial<AutoList>) {
    return this.repository.find([spec]);
  }

  async add(autoList: AutoList) {
    this.repository.add([autoList]);
  }

  async count(spec: Partial<AutoList>) {
    return this.repository.count([spec]);
  }
}
