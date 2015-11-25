const React = require("react");
const d = require("jsnox")(React);
const { Route, IndexRoute } = require("react-router");
const App = require("./containers/app.js");
const TagCloud = require("./components/tag-cloud.js");

module.exports = d(Route, { path: "/", component: App },
    d(IndexRoute, { component: TagCloud }));
