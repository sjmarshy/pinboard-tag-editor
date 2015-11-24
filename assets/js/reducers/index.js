const { combineReducers } = require("redux");
const tags = require("./tags.js");
const ui = require("./ui.js");

module.exports = combineReducers({
  tags,
  ui
});

