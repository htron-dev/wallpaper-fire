const { remote } = window.require("electron");
import { RootState } from "@/store";

const state: RootState = {
    appPath: remote.app.getAppPath(),
    videos: {
        path: remote.app.getPath("videos") + "/wallpaper-fire",
        current: null,
        all: [],
    }
}

export default state;