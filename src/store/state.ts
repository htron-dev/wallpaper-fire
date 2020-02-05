import { RootState } from "@/store";
const { remote } = window.require("electron");

const state: RootState = {
    notifications: [],
    topbarMessages: [],
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
