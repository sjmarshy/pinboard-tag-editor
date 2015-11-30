const { fromJS } = require("immutable");
const {
  SWAP_PAGE_TITLE,
  ADD_USERNAME } = require("../actions/ui.js");

module.exports = (state = fromJS({

  pageTitle: "Pinboard Tag Manager",
  username: ""
}), action) => {

  switch (action.type) {
  case ADD_USERNAME:

    return state.set("username", action.username);
  case SWAP_PAGE_TITLE:
  default:
    return state;
  }

};
