import { RootState } from "@/store";
const { remote } = window.require("electron");

const state: RootState = {
    notifications: [],
    user: {
        notifications: []
    },
    appPath: remote.app.getAppPath(),
    app: {
        window: {}
    },
    history: {
        lastWallpaperId: null,
        lastPlaylistId: null
    }
};

export default state;
