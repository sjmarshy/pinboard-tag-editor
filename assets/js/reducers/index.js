const { combineReducers } = require("redux");
const tags = require("./tags.js");
const ui = require("./ui.js");
const bookmarks = require("./bookmarks.js");

module.exports = combineReducers({
  tags,
  ui,
  bookmarks
});

