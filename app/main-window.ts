import { BrowserWindow, App, ipcMain, Menu } from "electron";
import { DatabaseService } from "./services";
import path from "path";

let mainWindow: BrowserWindow;
export default function createMainWindow (app: App) {
    mainWindow = new BrowserWindow({
        show: false,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: process.env.NODE_ENV !== "development"
        }
    });

    mainWindow.on("show", () => {
        const db = DatabaseService.connect();
        const bounds = db.get("app.window").value();
        mainWindow.setBounds(bounds);
    });

    // when resize the windows save the bounds in database
    mainWindow.on("resize", () => {
        const db = DatabaseService.connect();
        db.set("app.window", mainWindow.getBounds()).write();
    });
    // do not close app in x button insted just hide
    mainWindow.on("minimize", (e: Event) => {
        e.preventDefault();
        mainWindow.hide();
    });
    mainWindow.on("close", () => {
        mainWindow.destroy();
        app.quit();
    });

    ipcMain.handle("setup-database", async () => {
        const configPath = await DatabaseService.setup();
        return configPath;
    });

    // get index file, is equivalne to the index.html in dist/ folder
    const indexHTML = path.resolve(__dirname, "../index.html");
    // if is development use server port
    if (process.env.NODE_ENV === "development") {
        // load app in vue server
        mainWindow.loadURL("http://localhost:8080");
        // set development tools and menu buttons helpers
        const mainMenu = Menu.buildFromTemplate([
            {
                label: "Developer tools",
                click (item, focusWindow) {
                    focusWindow.webContents.openDevTools();
                }
            },
            {
                label: "Reload",
                click (item, focusWindow) {
                    focusWindow.reload();
                }
            }
        ]);
        // insert menu
        Menu.setApplicationMenu(mainMenu);

    } else {
        // else use the static file
        mainWindow.loadURL(`file://${indexHTML}`);
        // hide the menu in production mode
        Menu.setApplicationMenu(null);
    }

    return mainWindow;
}