/* globals window */

import fetch from "node-fetch";

export const GET_TAGS = "GET_TAGS";
export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const CANT_RECEIVE_TAGS = "CANT_RECEIVE_TAGS";
export const RENAME_TAG = "RENAME_TAG";
export const RENAME_TAG_SUCCESS = "RENAME_TAG_SUCCESS";
export const CANT_RENAME_TAG = "CANT_RENAME_TAG";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const REPLACE_FILTER = "REPLACE_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export function replaceFilter(oldFilter, newFilter) {

  return {

    type: REPLACE_FILTER,
    oldFilter,
    newFilter
  };
}

export function getTags() {

  // tags a'loadin
  return {

    type: GET_TAGS
  };
}

export function addFilter(filter) {

  return {

    type: ADD_FILTER,
    filter
  };
}

export function removeFilter(filter) {

  return {

    type: REMOVE_FILTER,
    filter
  };
}

export function clearFilters() {

  return {

    type: CLEAR_FILTERS
  };
}

export function receiveTags(tags) {

  // tags a'done
  return {

    type: RECEIVE_TAGS,
    tags
  };
}

export function renameTag() {

  return {

    type: RENAME_TAG
  };
}

export function renameTagSuccess(oldName, newName) {

  return {
    type: RENAME_TAG_SUCCESS,
    oldName,
    newName
  };
}

export function cantRenameTag(error) {

  return {

    type: CANT_RENAME_TAG,
    error
  };
}

export function cantReceiveTags(error) {

  return {

    type: CANT_RECEIVE_TAGS,
    error: error
  };
}

export function doRenameTags(oldName, newName) {

  return (dispatch) => {

    dispatch(renameTag());

    return fetch("/tags/rename",
        { method: "POST", body: `newName=${newName}&oldName=${oldName}` }).then(
          () => {

            return dispatch(renameTagSuccess(oldName, newName));
          }).catch((error) => {

            return dispatch(cantRenameTag(error));
          });
  };
}

export function doFetchTags() {

  return (dispatch) => {

    dispatch(getTags());

    let url = `${window.location.origin}/tags`;
    return fetch(url).then((response) => {

      return response.json();
    }).then((tags) => {

      dispatch(receiveTags(tags));
    }).catch((err) => {

      dispatch(cantReceiveTags(err));
    });
  };
}
