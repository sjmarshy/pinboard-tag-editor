import React from "react";
import jsnox from "jsnox";
import { doFetchTags } from "../actions/tags.js";
import { doFetchUsername } from "../actions/ui.js";
import { doFetchBookmarks } from "../actions/bookmarks.js";
import { connect } from "react-redux";
import Header from "../components/header.js";
import { pushPath } from "redux-simple-router";

const d = jsnox(React);

const App = React.createClass({

  componentWillMount() {

    this.props.dispatch(doFetchUsername());
    this.props.dispatch(doFetchBookmarks());
    this.props.dispatch(doFetchTags());
  },

  render() {

    let { dispatch } = this.props;

    return d("div.app-container", {},

        d(Header, { onShowTags: () => dispatch(pushPath("/")),
          onShowBookmarks: () => dispatch(pushPath("/bookmarks")) }),

        d("h1.pagetitle", {}, this.props.ui.get("pageTitle")),

        React.Children.map(this.props.children,
          (c) => React.cloneElement(c, this.props)));
  }
});

export default connect(s => s)(App);
