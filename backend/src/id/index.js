const { v4, validate } = require("uuid");
const makeId = () => v4();
const isValidId = (id) => validate(id);
module.exports = { makeId, isValidId };
