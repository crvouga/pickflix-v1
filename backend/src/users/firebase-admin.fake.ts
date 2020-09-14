export const buildFirebaseAdminFake = ({firebaseId = '1234567890'} = {}) => {
  const firebaseAdmin = {
    auth: () => ({
      verifyIdToken: (idToken: any) => ({
        uid: firebaseId,
      }),
    }),
  };
  return {firebaseAdmin};
};
