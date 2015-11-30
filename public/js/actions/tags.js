"use strict";

// GET_TAGS - fetch tags from the be / pinboard UI
// RECEIVE_TAGS - hydrate state with tags
// RENAME_TAG - rename an old tag to a new name
//
// getTags - action creator
// receiveTags - action creator
// renameTag - action creator
// fetchTags - actually fetch tags from the server.

var fetch = require("node-fetch");
var GET_TAGS = "GET_TAGS";
var RECEIVE_TAGS = "RECEIVE_TAGS";
var CANT_RECEIVE_TAGS = "CANT_RECEIVE_TAGS";
var RENAME_TAG = "RENAME_TAG";
var RENAME_TAG_SUCCESS = "RENAME_TAG_SUCCESS";
var CANT_RENAME_TAG = "CANT_RENAME_TAG";
var ADD_FILTER = "ADD_FILTER";
var REMOVE_FILTER = "REMOVE_FILTER";
var REPLACE_FILTER = "REPLACE_FILTER";
var CLEAR_FILTERS = "CLEAR_FILTERS";

function replaceFilter(oldFilter, newFilter) {

  return {

    type: REPLACE_FILTER,
    oldFilter: oldFilter,
    newFilter: newFilter
  };
}

function getTags() {

  // tags a'loadin
  return {

    type: GET_TAGS
  };
}

function addFilter(filter) {

  return {

    type: ADD_FILTER,
    filter: filter
  };
}

function removeFilter(filter) {

  return {

    type: REMOVE_FILTER,
    filter: filter
  };
}

function clearFilters() {

  return {

    type: CLEAR_FILTERS
  };
}

function receiveTags(tags) {

  // tags a'done
  return {

    type: RECEIVE_TAGS,
    tags: tags
  };
}

function renameTag() {

  return {

    type: RENAME_TAG
  };
}

function renameTagSuccess(oldName, newName) {

  return {
    type: RENAME_TAG_SUCCESS,
    oldName: oldName,
    newName: newName
  };
}

function cantRenameTag(error) {

  return {

    type: CANT_RENAME_TAG,
    error: error
  };
}

function cantReceiveTags(error) {

  return {

    type: CANT_RECEIVE_TAGS,
    error: error
  };
}

function doRenameTags(oldName, newName) {

  return function (dispatch) {

    dispatch(renameTag());

    return fetch("/tags/rename", { method: "POST", body: "newName=" + newName + "&oldName=" + oldName }).then(function () {

      return dispatch(renameTagSuccess(oldName, newName));
    }).catch(function (error) {

      return dispatch(cantRenameTag(error));
    });
  };
}

function doFetchTags() {

  return function (dispatch) {

    dispatch(getTags());

    var url = window.location.origin + "/tags";
    return fetch(url).then(function (response) {

      return response.json();
    }).then(function (tags) {

      dispatch(receiveTags(tags));
    }).catch(function (err) {

      dispatch(cantReceiveTags(err));
    });
  };
}

module.exports = {

  GET_TAGS: GET_TAGS,
  RECEIVE_TAGS: RECEIVE_TAGS,
  RENAME_TAG: RENAME_TAG,
  CANT_RECEIVE_TAGS: CANT_RECEIVE_TAGS,
  RENAME_TAG_SUCCESS: RENAME_TAG_SUCCESS,
  CANT_RENAME_TAG: CANT_RENAME_TAG,
  ADD_FILTER: ADD_FILTER,
  REMOVE_FILTER: REMOVE_FILTER,
  CLEAR_FILTERS: CLEAR_FILTERS,
  REPLACE_FILTER: REPLACE_FILTER,

  getTags: getTags,
  receiveTags: receiveTags,
  renameTag: renameTag,
  cantReceiveTags: cantReceiveTags,
  addFilter: addFilter,
  removeFilter: removeFilter,
  clearFilters: clearFilters,
  replaceFilter: replaceFilter,

  doFetchTags: doFetchTags,
  doRenameTags: doRenameTags
};