import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";
import { RepositoryHashMap } from "../../unit-of-work/repository.hash-map";
import { Credential } from "../models/make-credential";
import { ICredentialRepository } from "./types";

export class CredentialRepositoryFileSystem
  extends RepositoryFileSystem<Credential>
  implements ICredentialRepository {
  constructor() {
    super("credentials");
  }
}

export class CredentialRepositoryHashMap
  extends RepositoryHashMap<Credential>
  implements ICredentialRepository {
  constructor() {
    super();
  }
}
