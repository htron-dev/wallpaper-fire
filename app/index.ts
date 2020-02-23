import { app, BrowserWindow, Menu, MenuItemConstructorOptions, ipcMain, Tray, MenuItem } from "electron";
import { createTray } from "./services";
import createMainWindow from "./main-window";

let mainWindow: BrowserWindow;
app.on("ready", () => {
    mainWindow = createMainWindow(app);
    createTray(mainWindow);
});

const mainMenuTemplate: MenuItemConstructorOptions[] = [];

if (process.env.NODE_ENV === "development") {
    mainMenuTemplate.push(
        {
            label: "Developer tools",
            click (item: MenuItem, focusedWindow: BrowserWindow) {
                focusedWindow.webContents.openDevTools();
            }
        },
        {
            label: "Reload",
            click (item: MenuItem, focusedWindow: BrowserWindow) {
                focusedWindow.reload();
            }
        }
    );
}
