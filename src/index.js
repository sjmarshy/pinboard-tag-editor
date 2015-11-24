const electron = require("electron");
const express = require("express");
const { join }  = require("path");

const PTM_PORT = process.env.PTM_PORT || 8699;

const expressApp = express();

function init(e) {

  let { BrowserWindow, app } = e;
  let mainWindow;

  e.crashReporter.start();

  expressApp.use(express.static(join(__dirname, "..", "public")));

  app.on("ready", () => {

    mainWindow = new BrowserWindow({});

    expressApp.listen(PTM_PORT, () => {

      let URL = `http://localhost:${PTM_PORT}`;

      mainWindow.loadURL(URL);
    });
  });
}

init(electron);
