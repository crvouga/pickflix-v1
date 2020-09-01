const { getByCredentialsElseCreateNew } = require("../business-logic");
const authenicateFirebaseIdToken = require("../../infrastructure/firebase/authenicateFirebaseIdToken");

const { buildAuthenticateRequest } = require("./authenticate-request");

const authenticateRequest = buildAuthenticateRequest({
  getByCredentialsElseCreateNew,
  authenicateFirebaseIdToken,
});

module.exports = {
  authenticateRequest,
};
