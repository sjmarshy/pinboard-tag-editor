const React = require("react");
const d = require("jsnox")(React);

module.exports = React.createClass({

  render: function() {

    let tags = Object.keys(this.props.tags.get("tagList").toJS());

    return d("div.tag-cloud[data-component=tag-cloud]", {},
        tags.map(t => d("p.tag", {}, t)));
  }
});
