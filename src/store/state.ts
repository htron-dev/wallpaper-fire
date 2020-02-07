import { RootState } from "@/store";
const { remote } = window.require("electron");

const state: RootState = {
    notifications: [],
    user: {
        notifications: []
    },
    app: {
        appPath: remote.app.getAppPath(),
        configPath: `${remote.app.getPath("userData")}/wallpaperFire/config.json`,
        window: {}
    },
    history: {
        lastWallpaperId: null,
        lastPlaylistId: null
    }
};

export default state;
