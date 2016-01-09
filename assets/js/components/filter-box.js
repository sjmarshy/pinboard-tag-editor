import React from "react";
import jsnox from "jsnox";
import { replaceFilter } from "../actions/tags.js";

const d = jsnox(React);

export default React.createClass({

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
