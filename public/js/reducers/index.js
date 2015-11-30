"use strict";

var _require = require("redux");

var combineReducers = _require.combineReducers;

var tags = require("./tags.js");
var ui = require("./ui.js");

module.exports = combineReducers({
  tags: tags,
  ui: ui
});