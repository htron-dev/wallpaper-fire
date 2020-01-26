const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");

app.on("ready", () => {
    let window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: process.env.NODE_ENV === "production"
        }
    });

    window.setBounds({
        x: 0,
        y: 0,
        width: 900,
        height: 600
    });

    if (!fs.existsSync(`${app.getPath("userData")}/wallpaperFire.json`)) {
        fs.writeFileSync(`${app.getPath("userData")}/wallpaperFire.json`, "{}");
    }

    if (process.env.NODE_ENV === "production") {
        window.loadFile("./dist/index.html");
    } else {
        window.loadURL("http://localhost:8080");
        window.webContents.openDevTools();
    }

    // build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);

    window.on("close", () => {
        window = null;
    });
});

const mainMenuTemplate = [];

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push(
        {
            label: "Developer tools",
            click (item, focusedWindow) {
                focusedWindow.openDevTools();
            }
        },
        {
            label: "Reload",
            click (item, focusedWindow) {
                focusedWindow.reload();
            }
        }
    );
}
