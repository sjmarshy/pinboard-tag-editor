import React from "react";
import jsnox from "jsnox";

const d = jsnox(React);

export default ({ onShowTags, onShowBookmarks }) => d("header.ptm-header", {},
    d("div.links", {},
      d("a[href=#].link", { onClick: onShowTags }, "tags"),
      d("a[href=#].link", { onClick: onShowBookmarks }, "bookmarks")));
