const React = require("react");
const { render } = require("react-dom");
const { Router } = require("react-router");
const { doFetchTags } = require("./actions/tags.js");
const d = require("jsnox")(React);
const store = require("./store.js");

const App = React.createClass({

  componentWillMount: () => {

    return store.dispatch(doFetchTags());
  },

  render: function () {

    let state = store.getState();

    return d("div.app-container", {},
        d("h1.page-title", {}, state.ui.get("pageTitle")),
        this.props.children);
  }
});

let routes = {

  path: "/",
  component: App
};

render(
  d(Router, { routes }),
  document.querySelector("[data-app]"));
