"use strict";

var SWAP_PAGE_TITLE = "SWAP_PAGE_TITLE";
var ADD_USERNAME = "ADD_USERNAME";

function swapPageTitle(pageTitle) {

  return {

    type: SWAP_PAGE_TITLE,
    pageTitle: pageTitle
  };
}

function addUsername(username) {

  return {

    type: ADD_USERNAME,
    username: username
  };
}

function doFetchUsername() {

  return function (dispatch) {

    var url = window.location.origin + "/user";
    return fetch(url).then(function (response) {

      return response.json();
    }).then(function (resObj) {

      return dispatch(addUsername(resObj.username));
    });
  };
}

module.exports = {

  SWAP_PAGE_TITLE: SWAP_PAGE_TITLE,
  ADD_USERNAME: ADD_USERNAME,

  swapPageTitle: swapPageTitle,
  addUsername: addUsername,

  doFetchUsername: doFetchUsername
};