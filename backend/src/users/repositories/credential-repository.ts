import { Credential, CredentialId } from "../models/make-credential";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export interface ICredentialRepository {
  find(spec: Partial<Credential>): Promise<Credential[]>;

  add(credential: Credential): void;

  remove(id: CredentialId): void;

  update(id: CredentialId, partial: Partial<Credential>): void;
}

export class CredentialRepositoryHashMap implements ICredentialRepository {
  repository: GenericRepositoryHashMap<Credential>;

  constructor(repository: GenericRepositoryHashMap<Credential>) {
    this.repository = repository;
  }

  async find(spec: Partial<Credential>) {
    return this.repository.find(spec);
  }

  async add(credential: Credential) {
    this.repository.add([credential]);
  }

  async remove(id: CredentialId) {
    this.repository.remove([{ id }]);
  }

  async update(id: CredentialId, partial: Partial<Credential>) {
    this.repository.update({ id, ...partial });
  }
}

export class CredentialRepositoryFileSystem implements ICredentialRepository {
  repository: GenericRepositoryFileSystem<Credential>;

  constructor(repository: GenericRepositoryFileSystem<Credential>) {
    this.repository = repository;
  }

  async find(spec: Partial<Credential>) {
    return this.repository.find(spec);
  }

  async add(credential: Credential) {
    this.repository.add([credential]);
  }

  async remove(id: CredentialId) {
    this.repository.remove([{ id }]);
  }

  async update(id: CredentialId, partial: Partial<Credential>) {
    this.repository.update({ id, ...partial });
  }
}
