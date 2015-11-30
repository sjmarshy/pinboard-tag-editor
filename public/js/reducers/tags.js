"use strict";

var _require = require("immutable");

var fromJS = _require.fromJS;

var _require2 = require("../../../src/tags.js");

var searchTags = _require2.searchTags;

var _require3 = require("../actions/tags.js");

var GET_TAGS = _require3.GET_TAGS;
var RECEIVE_TAGS = _require3.RECEIVE_TAGS;
var RENAME_TAG = _require3.RENAME_TAG;
var RENAME_TAG_SUCCESS = _require3.RENAME_TAG_SUCCESS;
var CANT_RENAME_TAG = _require3.CANT_RENAME_TAG;
var CANT_RECEIVE_TAGS = _require3.CANT_RECEIVE_TAGS;
var ADD_FILTER = _require3.ADD_FILTER;
var REMOVE_FILTER = _require3.REMOVE_FILTER;
var REPLACE_FILTER = _require3.REPLACE_FILTER;
var CLEAR_FILTERS = _require3.CLEAR_FILTERS;

function filterTagList(filters, tagList) {

  var tags = Object.keys(tagList);
  var filteredTags = filters.reduce(function (xs, x) {
    return searchTags(xs, x);
  }, tags).map(function (x) {
    return x.string;
  });

  return filteredTags.reduce(function (tagsObject, t) {
    return tagsObject.set(t, tagList[t]);
  }, fromJS({}));
}

function applyFilteredTagList(s) {

  var filters = s.get("filters").toJS();
  var tagList = s.get("tagList").toJS();

  var newTagList = filterTagList(filters, tagList);

  return s.update("filteredTagList", function () {
    return newTagList;
  });
}

module.exports = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? fromJS({
    tagList: fromJS({}),
    filters: fromJS([]),
    filteredTagList: fromJS({}),
    loadingTags: false,
    error: false }) : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case GET_TAGS:

      return state.set("loadingTags", true);

    case RECEIVE_TAGS:

      return state.set("loadingTags", false).set("tagList", fromJS(action.tags)).set("filteredTagList", fromJS(action.tags));

    case ADD_FILTER:

      var newFilters = state.get("filters").push(action.filter).toJS();

      return applyFilteredTagList(state.set("filters", fromJS(newFilters)));

    case REMOVE_FILTER:

      var fx = action.filter;
      var currentFilterList = state.get("filters").toJS();
      var newFilterList = currentFilterList.filter(function (x) {
        return x !== fx;
      });

      return applyFilteredTagList(state.set("filters", fromJS(newFilterList)));

    case CLEAR_FILTERS:

      return state.set("filters", fromJS([])).set("filteredTagList", state.get("tagList"));

    case REPLACE_FILTER:

      var i = state.get("filters").indexOf(action.oldFilter);

      if (i > -1) {

        return applyFilteredTagList(state.update("filters", function () {
          return state.get("filters").update(i, function () {
            return action.newFilter;
          });
        }));
      } else {

        return applyFilteredTagList(state.update("filters", function () {
          return state.get("filters").push(action.newFilter);
        }));
      }
      break;

    case RENAME_TAG:
    case CANT_RECEIVE_TAGS:
    case RENAME_TAG_SUCCESS:
    case CANT_RENAME_TAG:
    default:
      return state;
  }
};