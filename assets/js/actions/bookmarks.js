/* globals window */
const fetch = require("node-fetch");

const GET_BOOKMARKS = "GET_BOOKMARKS";
const GET_BOOKMARKS_SUCCESS = "GET_BOOKMARKS_SUCCESS";
const GET_BOOKMARKS_FAIL = "GET_BOOKMARKS_FAIL";

const ADD_BOOKMARK_FILTER = "ADD_BOOKMARK_FILTER";
const CLEAR_BOOKMARK_FILTERS = "CLEAR_BOOKMARK_FILTERS";
const REMOVE_BOOKMARK_FILTER = "REMOVE_BOOKMARK_FILTER";

function getBookmarks() {
  
  return {

    type: GET_BOOKMARKS
  };
}

function getBookmarksSuccess(bookmarks) {
  
  return {
    
    type: GET_BOOKMARKS_SUCCESS,
    bookmarks
  };
}

function getBookmarksFail(error) {
  
  return {

    type: GET_BOOKMARKS_FAIL,
    error
  };
}

function addBookmarkFilter(filter) {

  return {

    type: ADD_BOOKMARK_FILTER,
    filter
  };
}

function clearBookmarkFilters() {

  return {

    type: CLEAR_BOOKMARK_FILTERS
  };
}

function removeBookmarkFilter(filter) {
  
  return {

    type: REMOVE_BOOKMARK_FILTER,
    filter
  };
}

function doFetchBookmarks() {

  return dispatch => {

    dispatch(getBookmarks());

    let url = `${window.location.origin}/bookmarks`;
    return fetch(url).then(response => {

      return dispatch(getBookmarksSuccess(response.json().bookmarks));
    }).catch(err => {

      return dispatch(getBookmarksFail(err.message));
    });
  };
}

module.exports = {

  GET_BOOKMARKS,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAIL,

  ADD_BOOKMARK_FILTER,
  CLEAR_BOOKMARK_FILTERS,
  REMOVE_BOOKMARK_FILTER,

  getBookmarks,
  getBookmarksSuccess,
  getBookmarksFail,

  addBookmarkFilter,
  clearBookmarkFilters,
  removeBookmarkFilter,

  doFetchBookmarks
};
