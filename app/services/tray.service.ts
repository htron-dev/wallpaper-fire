import { Tray, Menu, BrowserWindow } from "electron";
import path from "path";

// init varible here to avoid weird errors
let tray: Tray;

export function createTray (window: BrowserWindow, app: Electron.App) {
    // tray icon paths
    const iconPath = path.resolve(__dirname, "./../resources/icons/32x32.png");
    // init the tray
    tray = new Tray(iconPath);
    // set the tooptip
    tray.setToolTip("Wallpaper fire");
    // add the menu options
    const menu = Menu.buildFromTemplate([
        { label: "Open app", click: () => window.show() },
        { label: "Stop live wallpapers", click: () => window.webContents.send("stop-live-wallpaper") },
        // call function to destroy the app
        {
            label: "Exit app",
            click: () => {
                window.destroy();
                app.quit();
            }
        }
    ]);
    // set the menu
    tray.setContextMenu(menu);
    // open app in click
    tray.on("click", () => {
        window.isVisible() ? window.hide() : window.show();
    });

    return tray;
}
