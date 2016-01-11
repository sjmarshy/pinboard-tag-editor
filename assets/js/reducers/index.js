import { combineReducers } from "redux";
import tags from "./tags.js";
import ui from "./ui.js";
import { routeReducer } from "redux-simple-router";
import bookmarks from "./bookmarks.js";

export default combineReducers({
  routing: routeReducer,
  tags,
  ui,
  bookmarks
});

