const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences:{
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  
  win.setBounds({
    x: 0,
    y: 0,
    width: 900,
    height: 600
  });

  if(!fs.existsSync(`${app.getPath("videos")}/wallpaper-fire`)){
    fs.mkdirSync(`${app.getPath("videos")}/wallpaper-fire`);
  }

  if (process.env.NODE_ENV === "production") {
    win.loadFile("./dist/index.html");
  } else {
    win.loadURL("http://localhost:8080");
  }

  // build menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

  // insert menu
  Menu.setApplicationMenu(mainMenu);  
})

const mainMenuTemplate = [
  {
    label: "File"
  }
]

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer tools",
    click (item, focusedWindow) {
      focusedWindow.toggleDevTools()
    }
  })
}