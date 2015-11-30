const React = require("react");
const d = require("jsnox")(React);
const { replaceFilter } = require("../actions/tags.js");

module.exports = React.createClass({

  getInitialState() {

    return {

      filterValue: ""
    };
  },

  onFilterValueUpdate(e) {

    let oldFilterValue = this.state.filterValue;
    let newFilterValue = e.target.value;

    this.setState({

      filterValue: newFilterValue
    });

    this.props.dispatch(replaceFilter(oldFilterValue, newFilterValue));
  },

  render() {

    return (
        d(
          "div.filter-box",
          {},
          d("input.filter[type=text]",
            { value: this.state.filterValue,
              onChange: this.onFilterValueUpdate })));
  }
});
