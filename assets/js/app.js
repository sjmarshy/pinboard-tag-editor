const React = require("react");
const { render } = require("react-dom");
const { Router } = require("react-router");
const { Provider } = require("react-redux");
const d = require("jsnox")(React);
const store = require("./store.js");
const routes = require("./routes.js");


render(
    d(Provider, { store },
      d(Router, { routes })),
  document.querySelector("[data-app]"));
