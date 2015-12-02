/* globals erequire */
const React = require("react");
const d = require("jsnox")(React);
const shell = erequire("electron").shell;

module.exports = React.createClass({

  render: function() {

    let tags = Object.keys(this.props.tags.get("filteredTagList").toJS());
    let username = this.props.ui.get("username");

    return d("div.tag-cloud[data-component=tag-cloud]", {},
        tags.map(t => {

          return d("a.tag", {

            id: t,
            onClick: () => shell.openExternal(`https://pinboard.in/u:${username}/t:${t}/`)
          }, d("p", {}, t));
        }));
  }
});
