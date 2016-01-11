import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import appReducer from "./reducers";
import { createHistory } from "history";
import { syncReduxAndRouter } from "redux-simple-router";

export const history = createHistory();

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)(createStore);

export const store = createStoreWithMiddleware(appReducer);

syncReduxAndRouter(history, store);
