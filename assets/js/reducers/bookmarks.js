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

  default:
    return state;
  }
};
