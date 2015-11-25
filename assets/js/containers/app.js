const React = require("react");
const d = require("jsnox")(React);
const { doFetchTags } = require("../actions/tags.js");
const { connect } = require("react-redux");

const App = React.createClass({

  componentWillMount() {

    return this.props.dispatch(doFetchTags());
  },

  render() {

    return d("div.app-container", {},
        d("h1.pagetitle", {}, this.props.ui.get("pageTitle")),
        React.Children.map(this.props.children,
          (c) => React.cloneElement(c, this.props)));
  }
});


module.exports = connect(s => s)(App);
