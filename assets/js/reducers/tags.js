const { fromJS } = require("immutable");
const {
  GET_TAGS,
  RECEIVE_TAGS,
  RENAME_TAG,
  RENAME_TAG_SUCCESS,
  CANT_RENAME_TAG,
  CANT_RECEIVE_TAGS } = require("../actions/tags.js");

module.exports = (state=fromJS({ tagList: fromJS({}), loadingTags: false, error: false }),
      action) => {

  switch(action.type) {

  case GET_TAGS:

    return state.set("loadingTags", true);
  case RECEIVE_TAGS:

    return state.set("loadingTags", false).set(
        "tagList",
        action.tags.reduce((tagList, newTag) => {

          return tagList.set(newTag.tag, newTag);
        }, state.get("tagList")));
  case RENAME_TAG:
  case CANT_RECEIVE_TAGS:
  case RENAME_TAG_SUCCESS:
  case CANT_RENAME_TAG:
  default:
    return state;
  }
};
