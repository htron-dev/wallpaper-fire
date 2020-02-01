const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

app.on("ready", () => {
    let window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: process.env.NODE_ENV === "production"
        }
    });

    if (!fs.existsSync(`${app.getPath("userData")}/wallpaperFire`)) {
        fs.mkdirSync(`${app.getPath("userData")}/wallpaperFire`);
        fs.mkdirSync(`${app.getPath("userData")}/wallpaperFire/thumbnails`);
        fs.writeFileSync(`${app.getPath("userData")}/wallpaperFire/config.json`, "{}");
    }

    const adapter = new FileSync(`${app.getPath("userData")}/config.json`);
    const db = low(adapter);
    const appConfig = db.get("app").value();
    if (appConfig && appConfig.window) {
        window.setBounds(appConfig.window);
    }

    if (process.env.NODE_ENV === "production") {
        window.loadFile("./dist/index.html");
    } else {
        window.loadURL("http://localhost:8080");
    }

    // build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);
    // resise options
    window.on("resize", () => {
        db.set("app.window", window.getBounds()).write();
    });
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
