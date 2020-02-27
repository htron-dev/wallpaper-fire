import { RootState } from "@/store";
import { ActionTree } from "vuex";
import { Wallpaper } from "./modules/wallpaper/state";
const actions: ActionTree<RootState, RootState> = {

    setup ({ rootGetters, dispatch, commit }) {
        const db = rootGetters["db/get"];
        const history = db.get("history").value();
        if (history.lastPlaylistId) {
            const playlist = rootGetters["playlist/findById"](history.lastPlaylistId);
            dispatch("playlist/setPlaylist", playlist);
        } else if (history.lastWallpaperId) {
            const wallpaper = rootGetters["wallpaper/findById"](history.lastWallpaperId);
            dispatch("setDescktopWallpaper", wallpaper);
            commit("wallpaper/SET_CURREMT_WALLPAPER", wallpaper, { root: true });
        }
    },
    showNotification ({ commit }, notification: any) {
        notification = { ...notification, show: true };
        commit("ADD_NOTIFICATION", notification);
    },
    showErrorNotification ({ state, dispatch }, message: string) {
        const activeNotifications = state.notifications.filter(n => n.show).length;
        if (activeNotifications > 5) {
            return;
        }
        const notification = {
            color: "error",
            message
        };
        dispatch("showNotification", notification);
    },
    showSuccessNotification ({ state, dispatch }, message: string) {
        const activeNotifications = state.notifications.filter(n => n.show).length;
        if (activeNotifications > 5) {
            return;
        }

        const notification = {
            color: "success",
            message
        };
        dispatch("showNotification", notification);
    },
    setUserNotifications ({ rootGetters, commit }) {
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
    clearAllNotification ({ dispatch, rootGetters }) {
        const db = rootGetters["db/get"];

        db.set("user.notifications", []).write();

        dispatch("setUserNotifications");
    },
    async setDescktopWallpaper ({ rootGetters, dispatch, commit }, wallpaper: Wallpaper) {
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
        commit("wallpaper/SET_CURREMT_WALLPAPER", wallpaper, { root: true });
    },
    async stopAllLiveWallpapers ({ dispatch, commit }) {
        dispatch("kde/stopAll", {}, { root: true });
        dispatch("playlist/stopPlaylist", {}, { root: true });
        commit("wallpaper/SET_CURREMT_WALLPAPER", null, { root: true });
    }
};

export default actions;
