import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { Permission, PermissionId } from "../models";

export interface IPermissionRepository {
  find(spec: Partial<Permission>): Promise<Permission[]>;

  add(permission: Permission): void;

  remove(id: PermissionId): void;

  count(spec: Partial<Permission>): Promise<number>;
}

export class PermissionRepositoryHashMap implements IPermissionRepository {
  repository: GenericRepositoryHashMap<Permission>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<Permission>({});
  }

  async find(spec: Partial<Permission>) {
    return this.repository.find([spec]);
  }

  async add(permission: Permission) {
    this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Permission>) {
    return this.repository.count([spec]);
  }
}

export class PermissionRepositoryFileSystem implements IPermissionRepository {
  repository: GenericRepositoryFileSystem<Permission>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<Permission>(filePath);
  }

  async find(spec: Partial<Permission>) {
    return this.repository.find([spec]);
  }

  async add(permission: Permission) {
    this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Permission>) {
    return this.repository.count([spec]);
  }
}
