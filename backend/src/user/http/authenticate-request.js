module.exports = ({ getByForeignIds, authenicateFirebaseIdToken }) => async (
  request
) => {
  const {
    headers: { authorization: idToken },
  } = request;

  if (!idToken) {
    throw new Error(`Authorization header required`);
  }

  const firebaseUser = await authenicateFirebaseIdToken(idToken);

  const foreignIds = { firebaseId: firebaseUser.uid };

  const user = await getByForeignIds({ foreignIds });

  return user;
};
