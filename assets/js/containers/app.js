const React = require("react");
const d = require("jsnox")(React);
const { doFetchTags } = require("../actions/tags.js");
const { doFetchUsername } = require("../actions/ui.js");
const { connect } = require("react-redux");
const FilterBox = require("../components/filter-box.js");

const App = React.createClass({

  componentWillMount() {

    this.props.dispatch(doFetchUsername());
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


module.exports = connect(s => s)(App);
