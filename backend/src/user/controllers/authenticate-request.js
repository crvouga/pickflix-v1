module.exports.buildAuthenticateRequest = ({
  getByCredentialsElseCreateNew,
  authenicateFirebaseIdToken,
}) => async (request) => {
  const {
    headers: { authorization: idToken },
  } = request;

  if (!idToken) {
    throw new Error(`Authorization header required`);
  }

  const firebaseUser = await authenicateFirebaseIdToken(idToken);

  const credentials = { firebaseId: firebaseUser.uid };

  const user = await getByCredentialsElseCreateNew({ credentials });

  return user;
};
