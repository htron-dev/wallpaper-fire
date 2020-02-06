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
        notification = { ...notification, show: true };
        commit("ADD_NOTIFICATION", notification);
    },
    showErrorNotification ({ dispatch }, message: string) {
        const notification = {
            color: "error",
            message
        };
        dispatch("showNotification", notification);
    },
    showSuccessNotification ({ dispatch }, message: string) {
        const notification = {
            color: "success",
            message
        };
        dispatch("showNotification", notification);
    },
    setUserNotifications ({ dispatch, rootGetters, commit }) {
        const db = rootGetters["db/get"];
        const userNotifications = db
            .get("user.notifications")
            .orderBy("timestamp", "desc")
            .value();

        commit("SET_USER_NOTIFICATIONS", userNotifications);
    },
    showImportantNotification ({ dispatch, rootGetters }, notification: any) {
        notification = {
            ...notification,
            readed: false,
            timestamp: Date.now()
        };
        const db = rootGetters["db/get"];

        db.get("user.notifications").insert(notification).write();

        dispatch("showNotification", notification);

        dispatch("setUserNotifications");
    },
    removeNotification ({ dispatch, rootGetters }, id: any) {
        const db = rootGetters["db/get"];

        db.get("user.notifications").removeById(id).write();

        dispatch("setUserNotifications");
    },
    clearAllNotification ({ dispatch, rootGetters }, id: any) {
        const db = rootGetters["db/get"];

        db.set("user.notifications", []).write();

        dispatch("setUserNotifications");
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
