import React from "react";
import { render } from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { store, history } from "./store.js";
import routes from "./routes.js";

const d = require("jsnox")(React);

render(
    d(Provider, { store },
      d(Router, { routes, history })),
    document.querySelector("[data-app]"));
