import electron from "electron";
import express from "express";
import createRoutes from "./routes.js";
import { join } from "path";
import pinboard from "./pinboard";

const PTM_PORT = process.env.PTM_PORT || 8699;
const PTM_AUTH_TOKEN = process.env.PTM_AUTH_TOKEN;

const expressApp = express();

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

    expressApp.listen(PTM_PORT, () => {

      let URL = `http://localhost:${PTM_PORT}`;

      mainWindow.loadURL(URL);
    });
  });
}

init(electron);
