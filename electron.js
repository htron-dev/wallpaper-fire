const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");

app.on("ready", () => {
    let window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });

    window.setBounds({
        x: 0,
        y: 0,
        width: 900,
        height: 600
    });

    if (!fs.existsSync(`${app.getPath("videos")}/wallpaper-fire`)) {
        fs.mkdirSync(`${app.getPath("videos")}/wallpaper-fire`);
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
