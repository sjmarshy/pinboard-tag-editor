/* globals window */
import fetch from "node-fetch";

export const GET_BOOKMARKS = "GET_BOOKMARKS";
export const GET_BOOKMARKS_SUCCESS = "GET_BOOKMARKS_SUCCESS";
export const GET_BOOKMARKS_FAIL = "GET_BOOKMARKS_FAIL";

export const ADD_BOOKMARK_FILTER = "ADD_BOOKMARK_FILTER";
export const CLEAR_BOOKMARK_FILTERS = "CLEAR_BOOKMARK_FILTERS";
export const REMOVE_BOOKMARK_FILTER = "REMOVE_BOOKMARK_FILTER";

export function getBookmarks() {
  
  return {

    type: GET_BOOKMARKS
  };
}

export function getBookmarksSuccess(bookmarks) {
  
  return {
    
    type: GET_BOOKMARKS_SUCCESS,
    bookmarks
  };
}

export function getBookmarksFail(error) {
  
  return {

    type: GET_BOOKMARKS_FAIL,
    error
  };
}

export function addBookmarkFilter(filter) {

  return {

    type: ADD_BOOKMARK_FILTER,
    filter
  };
}

export function clearBookmarkFilters() {

  return {

    type: CLEAR_BOOKMARK_FILTERS
  };
}

export function removeBookmarkFilter(filter) {
  
  return {

    type: REMOVE_BOOKMARK_FILTER,
    filter
  };
}

export function doFetchBookmarks() {

  return dispatch => {

    dispatch(getBookmarks());

    let url = `${window.location.origin}/bookmarks`;
    return fetch(url).then(response => {


      return response.json();
    }).then(bs => {
      return dispatch(getBookmarksSuccess(bs));
    }).catch(err => {

      return dispatch(getBookmarksFail(err.message));
    });
  };
}
