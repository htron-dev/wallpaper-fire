const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const Database = require("./database");
const fs = require("fs");

app.on("ready", () => {
    let window = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: process.env.NODE_ENV !== "development"
        }
    });

    window.once("ready-to-show", () => {
        Database.setup().then(() => {
            window.show();
        });
    });

    ipcMain.handle("setup-database", async (event) => {
        const configPath = await Database.setup();
        return configPath;
    });
    ipcMain.on("set-window-bounds", () => {
        const db = Database.connect();
        const bounds = db.get("app.window").value();
        window.setBounds(bounds);
    });

    if (process.env.NODE_ENV === "development") {
        window.loadURL("http://localhost:8080");
    } else {
        window.loadFile("./dist/index.html");
    }

    // build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);
    // save resize options
    window.on("resize", () => {
        const db = Database.connect();
        db.set("app.window", window.getBounds()).write();
    });
    window.on("close", () => {
        window = null;
    });
});

const mainMenuTemplate = [];

if (process.env.NODE_ENV === "development") {
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
