import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository/generic-repository.hash-map";
import { Permission, PermissionId } from "../models";

export interface IPermissionRepository {
  find(spec: Partial<Permission>): Promise<Permission[]>;

  add(permission: Permission): void;

  remove(id: PermissionId): void;

  count(spec: Partial<Permission>): Promise<number>;
}

export class PermissionRepositoryHashMap implements IPermissionRepository {
  repository: GenericRepositoryHashMap<PermissionId, Permission>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<PermissionId, Permission>(
      {}
    );
  }

  async find(spec: Partial<Permission>) {
    return await this.repository.find([spec]);
  }

  async add(permission: Permission) {
    await this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Permission>) {
    return await this.repository.count([spec]);
  }
}

export class PermissionRepositoryFileSystem implements IPermissionRepository {
  repository: GenericRepositoryFileSystem<PermissionId, Permission>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<PermissionId, Permission>(
      filePath
    );
  }

  async find(spec: Partial<Permission>) {
    return await this.repository.find([spec]);
  }

  async add(permission: Permission) {
    await this.repository.add([permission]);
  }

  async remove(id: PermissionId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Permission>) {
    return await this.repository.count([spec]);
  }
}
