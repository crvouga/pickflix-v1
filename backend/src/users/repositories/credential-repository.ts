import { Credential, CredentialId } from "../models/make-credential";
import { GenericRepositoryHashMap } from "../../app/persistence/repository/generic-repository.hash-map";
import { GenericRepositoryFileSystem } from "../../app/persistence/repository/generic-repository.file-system";

export interface ICredentialRepository {
  find(spec: Partial<Credential>): Promise<Credential[]>;

  add(credential: Credential): void;

  remove(id: CredentialId): void;

  update(id: CredentialId, partial: Partial<Credential>): void;
}

export class CredentialRepositoryHashMap implements ICredentialRepository {
  repository: GenericRepositoryHashMap<CredentialId, Credential>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<CredentialId, Credential>(
      {}
    );
  }

  async find(spec: Partial<Credential>) {
    return this.repository.find([spec]);
  }

  async add(credential: Credential) {
    this.repository.add([credential]);
  }

  async remove(id: CredentialId) {
    this.repository.remove([{ id }]);
  }

  async update(id: CredentialId, partial: Partial<Credential>) {
    this.repository.update(id, partial);
  }
}

export class CredentialRepositoryFileSystem implements ICredentialRepository {
  repository: GenericRepositoryFileSystem<CredentialId, Credential>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<CredentialId, Credential>(
      filePath
    );
  }

  async find(spec: Partial<Credential>) {
    return this.repository.find([spec]);
  }

  async add(credential: Credential) {
    this.repository.add([credential]);
  }

  async remove(id: CredentialId) {
    this.repository.remove([{ id }]);
  }

  async update(id: CredentialId, partial: Partial<Credential>) {
    this.repository.update(id, partial);
  }
}
