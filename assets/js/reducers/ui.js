import { fromJS } from "immutable";
import  {
  SWAP_PAGE_TITLE,
  ADD_USERNAME } from "../actions/ui.js";

const defaultState = fromJS({

  pageTitle: "Pinboard Tag Manager",
  username: ""
});

export default (state = defaultState, action) => {

  switch (action.type) {
  case ADD_USERNAME:
    return state.set("username", action.username);

  case SWAP_PAGE_TITLE:
    return state.set("pageTitle", action.pageTitle);

  default:
    return state;
  }

};
