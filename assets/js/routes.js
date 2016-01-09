import React from "react";
import jsnox from "jsnox";
import { Route, IndexRoute } from "react-router";
import App from "./containers/app.js";
import TagCloud from "./components/tag-cloud.js";

const d = jsnox(React);

export default  d(Route, { path: "/", component: App },
    d(IndexRoute, { component: TagCloud }));
