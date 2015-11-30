"use strict";

var React = require("react");
var d = require("jsnox")(React);
var remote = require("remote");

module.exports = React.createClass({

  render: function render() {

    var tags = Object.keys(this.props.tags.get("filteredTagList").toJS());
    var username = this.props.ui.get("username");

    return d("div.tag-cloud[data-component=tag-cloud]", {}, tags.map(function (t) {
      return d("a.tag", {
        onClick: function onClick() {
          return remote.shell.openItem("https://pinboard.in/u:" + username + "/t:" + t + "/");
        }
      }, d("p", {}, t));
    }));
  }
});