import { RootState } from "@/store";
const { remote } = window.require("electron");

const state: RootState = {
    appPath: remote.app.getAppPath(),
    wallpapers: {
        lastId: 0,
        current: null,
        config: {},
        all: []
    }
};

export default state;
