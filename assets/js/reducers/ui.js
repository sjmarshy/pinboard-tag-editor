const { fromJS } = require("immutable");

module.exports = (state = fromJS({

  pageTitle: "Pinboard Tag Manager"
}), action) => {

  return state;
};
