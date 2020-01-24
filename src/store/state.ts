import { RootState } from "@/store";
const { remote } = window.require("electron");

const state: RootState = {
    appPath: remote.app.getAppPath(),
    app: {
        width: "",
        heigth: ""
    },
    history: {
        lastWallpaperId: null,
        lastPlaylistId: null,
    },
    wallpapers: {
        lastId: 0,
        all: []
    }
};

export default state;
