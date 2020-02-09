import { ActionTree } from "vuex";
import { RootState } from "@/store";
const fs = window.require("fs");
const app = window.require("electron").remote.app;
const exec = window.require("child_process").exec;
const getScript = (file: string) => {
    const plasmaScript = `dbus-send --session --dest=org.kde.plasmashell --type=method_call /PlasmaShell org.kde.PlasmaShell.evaluateScript 'string:
    var Desktops = desktops();                                                                                                                       
    for (i=0;i<Desktops.length;i++) {
            d = Desktops[i];
            d.wallpaperPlugin = "smartvideowallpaper";
            d.currentConfigGroup = Array("Wallpaper",
                                        "smartvideowallpaper",
                                        "General");
            d.writeConfig("FillMode", 0);
            d.writeConfig("VideoWallpaperBackgroundVideo", "file://${file}");
    }'`;

    return plasmaScript;
};
const getScriptToDefault = () => {
    const plasmaScript = `dbus-send --session --dest=org.kde.plasmashell --type=method_call /PlasmaShell org.kde.PlasmaShell.evaluateScript 'string:
    var Desktops = desktops();                                                                                                                       
    for (i=0;i<Desktops.length;i++) {
            d = Desktops[i];
            d.wallpaperPlugin = "org.kde.image";
            d.currentConfigGroup = Array("Wallpaper",
                                        "org.kde.image",
                                        "General");
    }'`;
    return plasmaScript;
};

const actions: ActionTree<{}, RootState> = {
    async setup ({ dispatch }) {
        const pluginPath = `${app.getPath("home")}/.local/share/plasma/wallpapers/smartvideowallpaper`;
        fs.access(pluginPath, (err: any) => {
            if (err) {
                const notification = {
                    color: "error",
                    message: "[KDE MODULE] Missing required kde plugin, SmartVideoWallpaper.\n Please download the plugin",
                    icon: "mdi-alert",
                    link: {
                        text: "Plugin page",
                        href: "https://store.kde.org/p/1316299/"
                    }
                };
                dispatch("showImportantNotification", notification, { root: true });
            } else {
                dispatch("showSuccessNotification", "[KDE MODULE] Module loaded", { root: true });
            }
        });
    },
    async getInformations () {
        const informations = {
            name: "KDE Module",
            dependences: [
                {
                    name: "Plugin SmartWallpaper",
                    href: "https://store.kde.org/p/1316299/"
                }
            ]
        };
        return informations;
    },
    async setWallpaperVideo ({ rootState, dispatch }, { path, wallpaper }) {
        const command = getScript(path);
        try {
            const { stdout, stderr } = await exec(command);
            dispatch("showSuccessNotification", `[KDE MODULE] Set wallpaper ${wallpaper.title}`, { root: true });
        } catch (error) {
            const notification = {
                color: "error",
                message: "[KDE MODULE] Error in set wallpaper",
                icon: "mdi-alert"
            };
            dispatch("showImportantNotification", notification, { root: true });
        }
    },
    async stopAll ({ dispatch }) {
        const command = getScriptToDefault();
        try {
            const { stdout, stderr } = await exec(command);
            dispatch("showSuccessNotification", "[KDE MODULE] Stop all live wallpapers", { root: true });
        } catch (error) {
            const notification = {
                color: "error",
                message: "[KDE MODULE] Error in stop all live wallpaper",
                icon: "mdi-alert"
            };
            dispatch("showImportantNotification", notification, { root: true });
        }
    }
};

export default actions;
