module.exports = ({ createNew, getByForeignIds }) => async ({ foreignIds }) => {
  const user = await getByForeignIds({ foreignIds });
  if (user) {
    return user;
  } else {
    return await createNew({ foreignIds });
  }
};
