import { createStore, compose } from "redux";
import rootReducer from "../assets/js/reducers/index.js";
import { electronEnhancer } from "redux-electron-store";

let finalCreateStore = compose(
    electronEnhancer())(createStore);

export const store = finalCreateStore(rootReducer);
