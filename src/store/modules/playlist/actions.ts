import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { PlayList, PlayListState } from "./state";

const actions: ActionTree<PlayListState, RootState> = {
    /**
     * Get by id method
     * @param store
     * @param id
     * ==================================================
     */
    async getById ({ rootGetters, dispatch }, id: number) {
        // get the db
        const db = rootGetters["db/get"];
        // create the playlist
        const playlist = db.get("playlist.all").getById(id).value();

        return playlist;
    },
    /**
     * Create method
     * @param store
     * @param playlist
     * ==================================================
     */
    async create ({ rootGetters, dispatch }, playlist: PlayList) {
        // get the db
        const db = rootGetters["db/get"];
        // create the playlist
        db.get("playlist.all").insert(playlist).write();

        dispatch("showSuccessNotification", `Playlist ${playlist.title} created`, { root: true });

        return playlist;
    },
    /**
     * Update method
     * @param store
     * @param data: { playlist, id }
     * ==================================================
     */
    async update ({ rootGetters, dispatch }, { id, playlist }) {
        // get the db
        const db = rootGetters["db/get"];
        // update the playlist
        db.get("playlist.all").updateById(id, playlist).write();

        dispatch("showSuccessNotification", "Playlist updated", { root: true });
    },
    /**
     * Delete method
     * @param store
     * @param id
     * ==================================================
     */
    async delete ({ dispatch, rootGetters }, id) {
        // get the db
        const db = rootGetters["db/get"];
        // delete the playlist
        db.get("playlist.all").removeById(id).write();

        dispatch("showSuccessNotification", "Playlist deleted", { root: true });
    },
    async setPlaylist ({ rootGetters, dispatch, commit }, playlist: PlayList) {
        // just set the interval if is more that 5 minutes
        let IntervalTime = 300000;
        if (playlist.config.delay > IntervalTime) {
            IntervalTime = playlist.config.delay;
        }
        // get the db
        const db = rootGetters["db/get"];
        // set the current playlistId
        db.set("history.lastPlaylistId", playlist.id).write();
        // get id of last played wallpaper
        let wallpaperId = playlist.wallpaperIds[0];
        // get the first wallpaper-id
        let lastWallpaperId = db.get("history.lastWallpaperId").value();
        if (playlist.wallpaperIds.includes(lastWallpaperId)) {
            wallpaperId = lastWallpaperId;
        }
        // get the wallpaper using the id
        let wallpaper = rootGetters["wallpaper/findById"](wallpaperId);
        // set the firs wallpaper
        dispatch("setDescktopWallpaper", wallpaper, { root: true });
        // init count
        let count = 0;
        // function to handle the cicles of wallpapers changes
        const loopToSetItenvals = () => {
            if (lastWallpaperId) {
                count = playlist.wallpaperIds
                    .findIndex(id => id === lastWallpaperId);
                lastWallpaperId = null;
                return;
            }
            // increment count
            count++;
            // get the next wallpaper id
            wallpaperId = playlist.wallpaperIds[count];
            // if the id do not exits reset the count
            if (!wallpaperId) {
                count = 0;
                wallpaperId = playlist.wallpaperIds[0];
            }
            // get the wallpaper in db
            wallpaper = rootGetters["wallpaper/findById"](wallpaperId);
            // set the wallpaper in descktop
            dispatch("setDescktopWallpaper", wallpaper, { root: true });
        };

        // create a timer
        const timer = setInterval(loopToSetItenvals, IntervalTime);
        // add the timer in the store state to be able to stop him
        commit("SET_TIMER", timer);
    },
    async stopPlaylist ({ commit, rootGetters }) {
        commit("CLEAR_TIMER");
        // get the db
        const db = rootGetters["db/get"];
        // set the ids to empty
        db.set("history.lastPlaylistId", null).write();
        db.set("history.lastWallpaperId", null).write();
    }
};

export default actions;
