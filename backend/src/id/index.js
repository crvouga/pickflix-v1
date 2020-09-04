"use strict";
exports.__esModule = true;
exports.isValidId = exports.makeId = void 0;
var uuid_1 = require("uuid");
exports.makeId = function () { return uuid_1.v4(); };
exports.isValidId = function (id) { return uuid_1.validate(id); };
