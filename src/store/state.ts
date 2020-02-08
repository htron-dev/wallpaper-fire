import { RootState } from "@/store";
const { remote, shell } = window.require("electron");

const state: RootState = {
    notifications: [],
    user: {
        notifications: []
    },
    app: {
        appPath: remote.app.getAppPath(),
        dataPath: remote.app.getPath("userData"),
        thumbsPath: `${remote.app.getPath("userData")}/thumbnails`,
        window: {}
    },
    history: {
        lastWallpaperId: null,
        lastPlaylistId: null
    },
    openExternalLink: (link: string) => {
        if (!link) {
            return undefined;
        }

        shell.openExternal(link);
    },
    openItem: (path: string) => {
        if (!path) {
            return undefined;
        }

        shell.openItem(path);
    }
};

export default state;
