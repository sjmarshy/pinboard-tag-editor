"use strict";

var React = require("react");
var d = require("jsnox")(React);

var _require = require("../actions/tags.js");

var replaceFilter = _require.replaceFilter;

module.exports = React.createClass({
  getInitialState: function getInitialState() {

    return {

      filterValue: ""
    };
  },
  onFilterValueUpdate: function onFilterValueUpdate(e) {

    var oldFilterValue = this.state.filterValue;
    var newFilterValue = e.target.value;

    this.setState({

      filterValue: newFilterValue
    });

    this.props.dispatch(replaceFilter(oldFilterValue, newFilterValue));
  },
  render: function render() {

    return d("div.filter-box", {}, d("input.filter[type=text]", { value: this.state.filterValue,
      onChange: this.onFilterValueUpdate }));
  }
});