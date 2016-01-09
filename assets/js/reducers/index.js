import { combineReducers } from "redux";
import tags from "./tags.js";
import ui from "./ui.js";
import bookmarks from "./bookmarks.js";

export default combineReducers({
  tags,
  ui,
  bookmarks
});

