// GET_TAGS - fetch tags from the be / pinboard UI
// RECEIVE_TAGS - hydrate state with tags
// RENAME_TAG - rename an old tag to a new name
//
// getTags - action creator
// receiveTags - action creator
// renameTag - action creator
// fetchTags - actually fetch tags from the server.

const fetch = require("node-fetch");
const GET_TAGS = "GET_TAGS";
const RECEIVE_TAGS = "RECEIVE_TAGS";
const CANT_RECEIVE_TAGS = "CANT_RECEIVE_TAGS";
const RENAME_TAG = "RENAME_TAG";
const RENAME_TAG_SUCCESS = "RENAME_TAG_SUCCESS";
const CANT_RENAME_TAG = "CANT_RENAME_TAG";


function getTags() {

  // tags a'loadin
  return {

    type: GET_TAGS
  };
}

function receiveTags(tags) {

  // tags a'done
  return {

    type: RECEIVE_TAGS,
    tags
  };
}

function renameTag() {

  return {

    type: RENAME_TAG,
  };
}

function renameTagSuccess(oldName, newName) {

  return {
    type: RENAME_TAG_SUCCESS,
    oldName,
    newName
  };
}

function cantRenameTag(error) {

  return {

    type: CANT_RENAME_TAG,
    error
  };
}

function cantReceiveTags(error) {

  return {

    type: CANT_RECEIVE_TAGS,
    error: error
  };
}

function doRenameTags(oldName, newName) {

  return (dispatch) => {

    dispatch(renameTag());

    return fetch("/tags/rename",
        { method: "POST", body: `newName=${newName}&oldName=${oldName}` }).then(
            (response) => {

          return dispatch(renameTagSuccess(oldName, newName));
        }).catch((error) => {

          return dispatch(cantRenameTag(error));
        });
  };
}

function doFetchTags() {

  return (dispatch) => {

    dispatch(getTags());

    return fetch("/tags").then((response) => {

      return response.json();
    }).then((tags) => {

      dispatch(receiveTags(tags));
    }).catch((err) => {

      dispatch(cantReceiveTags(err));
    });
  };
}

module.exports = {

  GET_TAGS,
  RECEIVE_TAGS,
  RENAME_TAG,
  CANT_RECEIVE_TAGS,
  RENAME_TAG_SUCCESS,
  CANT_RENAME_TAG,

  getTags,
  receiveTags,
  renameTag,
  cantReceiveTags,

  doFetchTags
};
