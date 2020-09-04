import {User} from '../business-entities/user';
import {HttpRequest} from '../../types/http';
import {GetElseCreateNew} from '../business-logic/get-else-create-new';

export type AuthenticateRequest = (
  request: Partial<HttpRequest>
) => Promise<User>;

type Dependencies = {
  getElseCreateNew: GetElseCreateNew;
  authenicateFirebaseIdToken: (_: string) => Promise<{uid: string}>;
};
type Build = (_: Dependencies) => AuthenticateRequest;

const build: Build = ({getElseCreateNew, authenicateFirebaseIdToken}) => {
  const authenicateRequest: AuthenticateRequest = async request => {
    const {
      headers: {authorization: idToken},
    } = request;

    if (!idToken) {
      throw new Error('Authorization header required');
    }

    const firebaseUser = await authenicateFirebaseIdToken(idToken);

    const user = await getElseCreateNew({firebaseId: firebaseUser.uid});

    return user;
  };
  return authenicateRequest;
};

export default build;
