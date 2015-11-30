const { fromJS } = require("immutable");
const { searchTags } = require("../../../src/tags.js");
const {
  GET_TAGS,
  RECEIVE_TAGS,
  RENAME_TAG,
  RENAME_TAG_SUCCESS,
  CANT_RENAME_TAG,
  CANT_RECEIVE_TAGS,
  ADD_FILTER,
  REMOVE_FILTER,
  REPLACE_FILTER,
  CLEAR_FILTERS } = require("../actions/tags.js");

function filterTagList(filters, tagList) {

  let tags = Object.keys(tagList);
  let filteredTags = filters.reduce(
      (xs, x) => searchTags(xs, x),
      tags).map((x) => x.string);

  return filteredTags.reduce(
      (tagsObject, t) => tagsObject.set(t, tagList[t]),
      fromJS({}));
}

function applyFilteredTagList(s) {

  let filters = s.get("filters").toJS();
  let tagList = s.get("tagList").toJS();

  let newTagList = filterTagList(filters, tagList);

  return s.update("filteredTagList", () => newTagList);
}

module.exports = (
    state=fromJS({
      tagList: fromJS({}),
      filters: fromJS([]),
      filteredTagList: fromJS({}),
      loadingTags: false,
      error: false }),
    action) => {

  switch(action.type) {

  case GET_TAGS:

    return state.set("loadingTags", true);

  case RECEIVE_TAGS:

    return state.set("loadingTags", false).set(
        "tagList",
        fromJS(action.tags)).set(
        "filteredTagList",
        fromJS(action.tags));

  case ADD_FILTER:

    let newFilters = state.get("filters").push(action.filter).toJS();

    return applyFilteredTagList(
        state.set(
          "filters",
          fromJS(newFilters)));

  case REMOVE_FILTER:

    let fx = action.filter;
    let currentFilterList = state.get("filters").toJS();
    let newFilterList = currentFilterList.filter((x) => x !== fx);

    return applyFilteredTagList(
        state.set(
          "filters",
          fromJS(newFilterList)));

  case CLEAR_FILTERS:

    return state.set("filters", fromJS([])).
      set("filteredTagList", state.get("tagList"));

  case REPLACE_FILTER:

    let i = state.get("filters").indexOf(action.oldFilter);

    if (i > -1) {

      return applyFilteredTagList(
          state.update(
            "filters",
            () => state.get("filters").update(i, () => action.newFilter)));
    } else {

      return applyFilteredTagList(
          state.update(
            "filters",
            () => state.get("filters").push(action.newFilter)));
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
