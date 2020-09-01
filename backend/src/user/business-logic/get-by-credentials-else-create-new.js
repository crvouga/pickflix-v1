module.exports.buildGetByCredentialsElseCreateNew = ({
  createNew,
  getByCredentials,
}) => async ({ credentials }) => {
  const user = await getByCredentials({ credentials });
  if (user) {
    return user;
  } else {
    const newUser = await createNew({ credentials });
    return newUser;
  }
};
