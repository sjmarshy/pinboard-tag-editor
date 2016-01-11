/* globals erequire */
const React = require("react");
const d = require("jsnox")(React);
const shell = erequire("electron").shell;

import FilterBox from "./filter-box.js";

module.exports = (props) => {

  let tags = Object.keys(props.tags.get("filteredTagList").toJS());
  let username = props.ui.get("username");
  let { dispatch } = props;

  return d("div.tag-cloud[data-component=tag-cloud]", {},
      d(FilterBox, { dispatch }),
      tags.map(t => {

        return d("a.tag", {

          id: t,
          onClick: () => shell.openExternal(`https://pinboard.in/u:${username}/t:${t}/`)
        }, d("p", {}, t));
      }));
};
