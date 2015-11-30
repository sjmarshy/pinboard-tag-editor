"use strict";

var _require = require("immutable");

var fromJS = _require.fromJS;

var _require2 = require("../actions/ui.js");

var SWAP_PAGE_TITLE = _require2.SWAP_PAGE_TITLE;
var ADD_USERNAME = _require2.ADD_USERNAME;

module.exports = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? fromJS({

    pageTitle: "Pinboard Tag Manager",
    username: ""
  }) : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case ADD_USERNAME:

      return state.set("username", action.username);
    case SWAP_PAGE_TITLE:
    default:
      return state;
  }
};