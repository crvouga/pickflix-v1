const AppUserModel = require("../data/AppUser");
const ListModel = require("../data/List");

const create = async ({ firebaseId }) => {
  const appUser = await AppUserModel.create({ firebaseId });
  await ListModel.create({ name: "Watchlist", appUserId: appUser.id });
  await ListModel.create({ name: "Like", appUserId: appUser.id });
  return appUser;
};

const getOrCreate = async ({ firebaseId }) => {
  const appUser = await AppUserModel.get({ firebaseId });
  if (appUser) {
    return appUser;
  } else {
    return create({ firebaseId });
  }
};

module.exports = {
  getOrCreate,
};
