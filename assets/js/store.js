const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk");
const createLogger = require("redux-logger");
const appReducer = require("./reducers");

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)(createStore);

module.exports = createStoreWithMiddleware(appReducer);
