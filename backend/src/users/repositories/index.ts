import {CredentialRepositoryInMemory} from './credential-repository.fake';
import {UserRepositoryInMemory} from './user-repository.fake';

export const userRepository = new UserRepositoryInMemory();
export const credentialRepository = new CredentialRepositoryInMemory();
