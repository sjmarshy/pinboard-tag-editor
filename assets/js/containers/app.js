import React from "react";
import jsnox from "jsnox";
import { doFetchTags } from "../actions/tags.js";
import { doFetchUsername } from "../actions/ui.js";
import { doFetchBookmarks } from "../actions/bookmarks.js";
import { connect } from "react-redux";
import FilterBox from "../components/filter-box.js";

const d = jsnox(React);

const App = React.createClass({

  componentWillMount() {

    this.props.dispatch(doFetchUsername());
    this.props.dispatch(doFetchBookmarks());
    return this.props.dispatch(doFetchTags());
  },

  render() {

    return d("div.app-container", {},
        d("h1.pagetitle", {}, this.props.ui.get("pageTitle")),
        d(FilterBox, {
          dispatch: this.props.dispatch
        }),
        React.Children.map(this.props.children,
          (c) => React.cloneElement(c, this.props)));
  }
});


export default connect(s => s)(App);
