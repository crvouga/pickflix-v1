import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { RepositoryQueryOptions } from "../../app/data-access/types";
import { ListItemId, Permission, PermissionId } from "../models";
import { ListItem } from "../models/make-list-item";

export interface IPermissionRepository {
  find(spec: Partial<Permission>): Promise<Permission[]>;

  add(permission: Permission): void;

  remove(id: PermissionId): void;
}

export class PermissionRepositoryHashMap implements IPermissionRepository {
  repository: GenericRepositoryHashMap<Permission>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<Permission>({});
  }

  async find(spec: Partial<Permission>) {
    return this.repository.find(spec);
  }

  async add(permission: Permission) {
    this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    this.repository.remove([{ id }]);
  }
}

export class PermissionRepositoryFileSystem implements IPermissionRepository {
  repository: GenericRepositoryFileSystem<Permission>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<Permission>(filePath);
  }

  async find(spec: Partial<Permission>) {
    return this.repository.find(spec);
  }

  async add(permission: Permission) {
    this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    this.repository.remove([{ id }]);
  }
}
