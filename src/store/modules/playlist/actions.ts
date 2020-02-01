import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { PlayList, PlayListState } from "./state";

const actions: ActionTree<PlayListState, RootState> = {
    async setPlaylist ({ state, rootGetters, dispatch, commit }, playlist: PlayList) {
        // get the db
        const db = rootGetters["db/get"];
        // set the current playlistId
        db.set("history.lastPlaylistId", playlist.id).write();
        let wallpaperId = playlist.wallpaperIds[0];
        let count = 0;
        let wallpaper = null;
        let IntervalTime = 300000;
        if (playlist.config.delay > IntervalTime) {
            IntervalTime = playlist.config.delay;
        }
        const loopToSetItenvals = () => {
            wallpaperId = playlist.wallpaperIds[count];
            if (!wallpaperId) {
                count = 0;
                wallpaperId = playlist.wallpaperIds[0];
            }
            wallpaper = rootGetters["wallpaper/findById"](wallpaperId);
            dispatch("setDescktopWallpaper", wallpaper, { root: true });
            count++;
        };

        const timer = setInterval(loopToSetItenvals, IntervalTime);
        commit("SET_TIMER", timer);
    },
    async stopPlaylist ({ commit }, playlist: PlayList) {
        commit("CLEAR_TIMER");
    }
};

export default actions;
