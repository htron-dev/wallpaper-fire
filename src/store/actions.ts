import { RootState } from "@/store";
import { ActionTree } from "vuex";
import { Wallpaper } from "./modules/wallpaper/state";
import state from "./modules/playlist/state";

const actions: ActionTree<RootState, RootState> = {

    setup ({ commit, rootGetters, dispatch }) {
        const db = rootGetters["db/get"];
        const history = db.get("history").value();
        if (history.lastPlaylistId) {
            const playlist = rootGetters["playlist/findById"](history.lastPlaylistId);
            dispatch("playlist/setPlaylist", playlist);
        }
        if (history.lastWallpaperId) {
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

    async setWallpapers ({ commit, rootGetters }) {
        const db = rootGetters["db/get"];
        const wallpapers = db.get("wallpapers.all").value();        
        commit("SET_WALLPAPERS", wallpapers);
    },
    async setDescktopWallpaper ({ rootGetters, dispatch }, wallpaper: Wallpaper) {

        if (!wallpaper) {
            dispatch("showErrorNotification", "Invalid wallpaper");
        }

        const options = {
            videoPath: wallpaper.path
        };

        dispatch("kde/setWallpaperVideo", options, { root: true });

        const db = rootGetters["db/get"];
        db.set("history.lastWallpaperId", wallpaper.id).write();
    }
};

export default actions;
