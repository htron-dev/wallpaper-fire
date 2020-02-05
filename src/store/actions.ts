import { RootState } from "@/store";
import { ActionTree } from "vuex";
import { Wallpaper } from "./modules/wallpaper/state";

const actions: ActionTree<RootState, RootState> = {

    setup ({ rootGetters, dispatch }) {
        const db = rootGetters["db/get"];
        const history = db.get("history").value();
        if (history.lastPlaylistId) {
            const playlist = rootGetters["playlist/findById"](history.lastPlaylistId);
            dispatch("playlist/setPlaylist", playlist);
        } else if (history.lastWallpaperId) {
            const wallpaper = rootGetters["wallpaper/findById"](history.lastWallpaperId);
            dispatch("setDescktopWallpaper", wallpaper);
        }
    },
    showNotification ({ commit }, notification: any) {
        commit("ADD_NOTIFICATION", notification);
    },
    showErrorNotification ({ dispatch }, message: string) {
        const notification = {
            color: "error",
            show: true,
            message
        };
        dispatch("showNotification", notification);
    },
    showSuccessNotification ({ dispatch }, message: string) {
        const notification = {
            color: "success",
            show: true,
            message
        };
        dispatch("showNotification", notification);
    },
    async setDescktopWallpaper ({ rootGetters, dispatch }, wallpaper: Wallpaper) {
        if (!wallpaper) {
            dispatch("showErrorNotification", "Invalid wallpaper");
        }

        const options = {
            path: wallpaper.path,
            wallpaper: wallpaper
        };

        dispatch("kde/setWallpaperVideo", options, { root: true });

        const db = rootGetters["db/get"];
        db.set("history.lastWallpaperId", wallpaper.id).write();
    }
};

export default actions;
