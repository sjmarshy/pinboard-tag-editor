"use strict";

var React = require("react");
var d = require("jsnox")(React);

var _require = require("../actions/tags.js");

var doFetchTags = _require.doFetchTags;

var _require2 = require("../actions/ui.js");

var doFetchUsername = _require2.doFetchUsername;

var _require3 = require("react-redux");

var connect = _require3.connect;

var FilterBox = require("../components/filter-box.js");

var App = React.createClass({
  componentWillMount: function componentWillMount() {

    this.props.dispatch(doFetchUsername());
    return this.props.dispatch(doFetchTags());
  },
  render: function render() {
    var _this = this;

    return d("div.app-container", {}, d("h1.pagetitle", {}, this.props.ui.get("pageTitle")), d(FilterBox, {
      dispatch: this.props.dispatch
    }), React.Children.map(this.props.children, function (c) {
      return React.cloneElement(c, _this.props);
    }));
  }
});

module.exports = connect(function (s) {
  return s;
})(App);