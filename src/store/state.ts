import { RootState } from "@/store";
const { remote } = window.require("electron");

const state: RootState = {
    appPath: remote.app.getAppPath(),
    videos: {
        path: remote.app.getPath("videos") + "/wallpaper-fire",
        current: null,
        all: []
    }
};

export default state;
