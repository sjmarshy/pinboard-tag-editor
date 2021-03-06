"use strict";

const fetch = require("node-fetch");

const GET_TAGS = "tags/get";
const RENAME_TAGS = "tags/rename";

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
    }).catch((e) => console.log(e));
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

module.exports = (authToken) => {

  return {

    getTags: createGetTags(authToken),
    renameTags: createRenameTags(authToken)
  };
};
