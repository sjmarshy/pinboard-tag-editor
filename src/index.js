const electron = require("electron");
const { join }  = require("path");


function init(e) {

  let { BrowserWindow, app } = e;
  let mainWindow;

  e.crashReporter.start();

  app.on("ready", () => {

    mainWindow = new BrowserWindow({});

    mainWindow.loadURL("file://"  + join( __dirname, "..", "index.html"));
  });
}

init(electron);
