"use strict";

var _require = require("redux");

var createStore = _require.createStore;
var applyMiddleware = _require.applyMiddleware;

var thunkMiddleware = require("redux-thunk");
var createLogger = require("redux-logger");
var appReducer = require("./reducers");

var loggerMiddleware = createLogger();

var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

module.exports = createStoreWithMiddleware(appReducer);