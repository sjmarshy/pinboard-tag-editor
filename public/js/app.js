"use strict";

var React = require("react");

var _require = require("react-dom");

var render = _require.render;

var _require2 = require("react-router");

var Router = _require2.Router;

var _require3 = require("react-redux");

var Provider = _require3.Provider;

var d = require("jsnox")(React);
var store = require("./store.js");
var routes = require("./routes.js");

render(d(Provider, { store: store }, d(Router, { routes: routes })), document.querySelector("[data-app]"));