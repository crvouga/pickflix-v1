const R = require("ramda");
const mung = require("express-mung");

const BLACKLIST = ["appUserId"];

const deepOmit = R.curry((keys, obj) =>
  R.cond([
    [R.is(Array), R.map(deepOmit(keys))],
    [R.is(Object), R.pipe(R.omit(keys), R.map(deepOmit(keys)))],
    [R.T, R.identity],
  ])(obj)
);

const redact = (json, req, res) => {
  return deepOmit(BLACKLIST, json);
};

module.exports = mung.json(redact);
