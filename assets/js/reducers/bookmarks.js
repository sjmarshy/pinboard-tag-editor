const {
  GET_BOOKMARKS,
  GET_BOOKMARKS_FAIL,
  GET_BOOKMARKS_SUCCESS,
  ADD_BOOKMARK_FILTER,
  CLEAR_BOOKMARK_FILTERS,
  REMOVE_BOOKMARK_FILTER
} = require("../actions/bookmarks.js");

const { fromJS } = require("immutable");

const defaultState = fromJS({

  bookmarks: fromJS([]),
  bookmarkFilters: fromJS([]),
  fetchingBookmarks: false,
  filteredBookmarks: fromJS([]),
  error: ""
});

module.exports = (state = defaultState, action) => {

  switch(action.type) {

  case GET_BOOKMARKS:
    return state.set("fetchingBookmarks", true);

  case GET_BOOKMARKS_FAIL:
    return state.set("fetchingBookmarks", false)
      .set("error", action.error);

  case GET_BOOKMARKS_SUCCESS:
    return state.set("fetchingBookmarks", false)
      .set("bookmarks", action.bookmarks);

  case ADD_BOOKMARK_FILTER:
    return state.set(
        "bookmarkFilters",
        state.get("bookmarkFilters").push(action.filter));

  case CLEAR_BOOKMARK_FILTERS:
    return state.set("bookmarkFilters", fromJS([]));

  case REMOVE_BOOKMARK_FILTER:
    return state.set(
        "bookmarkFilters",
        state.get("bookmarkFilters").filter(f => {

          return f !== action.filter;
        }));

  default:
    return state;
  }
};
