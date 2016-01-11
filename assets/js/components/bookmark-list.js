import React from "react";
import jsnox from "jsnox";

const d = jsnox(React);

export default ({ bookmarks }) => d("div.bookmark-list", {},
    d("h2.title", {}, "Bookmarks"),
    bookmarks.get("bookmarks").map(bm => {

      return d("div.single-bookmark", {}, bm);
    }));
