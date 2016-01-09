"use strict";

import fetch from "node-fetch";
import { log } from "./util.js";

const GET_TAGS = "tags/get";
const RENAME_TAGS = "tags/rename";
const GET_BOOKMARKS = "posts/all";

function makePinboardURL(path, authToken, furtherArgs) {

  let argNames = [];

  if (furtherArgs !== undefined) {
    argNames = Object.keys(furtherArgs);
  }

  if (argNames.length > 0) {

    return argNames.reduce((url, argName) =>  {

      return url + `&${argName}=${furtherArgs[argName]}`;
    }, `https://api.pinboard.in/v1/${path}?auth_token=${authToken}&format=json`);
  } else {
    return `https://api.pinboard.in/v1/${path}?auth_token=${authToken}&format=json`;
  }
}

function createGetTags(authToken) {

  return () => {

    let url = makePinboardURL(GET_TAGS, authToken);

    return fetch(url).then((res) => {

      return res.json();
    }).catch((e) => log(e));
  };
}

function createRenameTags(authToken) {

  return (oldTag, newTag) => {

    return fetch(makePinboardURL(RENAME_TAGS, authToken,
          { old: oldTag, new: newTag })).then(
          (res) => {

            return res.json();
          });
  };
}

function createGetBookmarks(authToken) {
  
  return () => {

    return fetch(makePinboardURL(GET_BOOKMARKS, authToken)).then(res => {

      let rj = res.json();

      return rj;
    });
  };
}

export default (authToken) => {

  return {

    getTags: createGetTags(authToken),
    renameTags: createRenameTags(authToken),
    getBookmarks: createGetBookmarks(authToken)
  };
};
