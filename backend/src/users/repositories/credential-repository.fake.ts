import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { Credential } from "../models/make-credential";
import { ICredentialRepository } from "./types";

export class CredentialRepositoryFileSystem
  extends GenericRepositoryFileSystem<Credential>
  implements ICredentialRepository {
  constructor() {
    super("credentials");
  }
}

export class CredentialRepositoryHashMap
  extends GenericRepositoryHashMap<Credential>
  implements ICredentialRepository {
  constructor() {
    super();
  }
}
