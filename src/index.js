import electron from "electron";
import express from "express";
import createRoutes from "./routes.js";
import { join } from "path";
import pinboard from "./pinboard";
import store from "./store.js";
import { receiveTags } from "../assets/js/actions/tags.js";
import { getBookmarksSuccess } from "../assets/js/actions/bookmarks.js";
import { addUsername } from "../assets/js/actions/ui.js";

const PTM_PORT = process.env.PTM_PORT || 8699;
const PTM_AUTH_TOKEN = process.env.PTM_AUTH_TOKEN;

const expressApp = express();

const hydrate = () => {

  let pb = pinboard(PTM_AUTH_TOKEN);

  pb.getTags().then(tags => store.dispatch(receiveTags(tags)));
  pb.getBookmarks().then(bookmarks => store.dispatch(getBookmarksSuccess(bookmarks)));

  store.dispatch(addUsername(PTM_AUTH_TOKEN.split(":")[0]));
};

function init(e) {

  let { BrowserWindow, app } = e;
  let mainWindow;

  e.crashReporter.start();

  expressApp.use(express.static(join(__dirname, "..", "public")));

  if (PTM_AUTH_TOKEN === undefined) {

    throw new Error("please set PTM_AUTH_TOKEN to the value of your pinboard token");
  }

  createRoutes(expressApp, pinboard(PTM_AUTH_TOKEN), PTM_AUTH_TOKEN);

  app.on("ready", () => {

    mainWindow = new BrowserWindow({});

    hydrate();

    expressApp.listen(PTM_PORT, () => {

      let URL = `http://localhost:${PTM_PORT}`;

      mainWindow.loadURL(URL);
    });
  });
}

init(electron);
