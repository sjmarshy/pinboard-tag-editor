"use strict";

var React = require("react");
var d = require("jsnox")(React);

var _require = require("react-router");

var Route = _require.Route;
var IndexRoute = _require.IndexRoute;

var App = require("./containers/app.js");
var TagCloud = require("./components/tag-cloud.js");

module.exports = d(Route, { path: "/", component: App }, d(IndexRoute, { component: TagCloud }));