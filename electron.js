const { app, BrowserWindow, Menu } = require("electron")
// const Store = require("./store");

// // // First instantiate the class
// // const store = new Store({
// //   // We'll call our data file 'user-preferences'
// //   configName: 'wallpaper-fire',
// //   defaults: {
// //     // 800x600 is the default size of our window
// //     windowBounds: { width: 800, height: 600 }
// //   }
// // });

app.on("ready", () => {
  const win = new BrowserWindow()
  
  win.setBounds({
    x: 0,
    y: 0,
    width: 900,
    height: 600
  })

  win.loadFile("./dist/index.html")

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