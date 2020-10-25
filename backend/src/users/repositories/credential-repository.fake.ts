import {RepositoryFileSystem} from '../../unit-of-work/repository.file-system';
import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {Credential} from '../models/make-credential';
import {ICredentialRepository} from './types';

export class CredentialRepositoryFileSystem
  extends RepositoryFileSystem<Credential>
  implements ICredentialRepository {
  constructor() {
    super('credentials');
  }
}

export class CredentialRepositoryInMemory
  extends RepositoryInMemory<Credential>
  implements ICredentialRepository {
  constructor() {
    super();
  }
}
