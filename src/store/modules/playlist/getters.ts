import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { PlayListState, PlayList } from "./state";

const getters: GetterTree<PlayListState, RootState> = {
    getAll: (state, getters, rootState, rootGetters): PlayList[] => {
        const db = rootGetters["db/get"];
        const playlist = db.get("playlist.all").value();
        return playlist;
    },
    findById: (state, getters, rootState, rootGetters) => (id: number): PlayList => {
        // // get the db
        const db = rootGetters["db/get"];
        // // look for the playlist
        const playlist = db.get("playlist.all")
            .find({ id })
            .value();
        // // return the list of playlist filered
        return playlist;
    },
    create: (state, getters, rootState, rootGetters) => (playlist: PlayList) => {
        const db = rootGetters["db/get"];
        db.get("playlist.all").insert(playlist).write();
        return playlist;
    },
    update: (state, getters, rootState, rootGetters) => (id: number, playlist: PlayList) => {
        const db = rootGetters["db/get"];
        db.get("playlist.all").updateById(id, playlist).write();
    }
};

export default getters;
