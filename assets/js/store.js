import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import appReducer from "./reducers";
import { createHistory } from "history";
import { syncReduxAndRouter } from "redux-simple-router";
import { electronEnhancer } from "redux-electron-store";

export const history = createHistory();

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware),
        electronEnhancer(true))(createStore);

export const store = createStoreWithMiddleware(appReducer);

syncReduxAndRouter(history, store);
