import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {Credential} from '../models/make-credential';
import {ICredentialRepository} from './types';

export class CredentialRepositoryFake
  extends RepositoryFake<Credential>
  implements ICredentialRepository {
  constructor() {
    super();
  }
}
