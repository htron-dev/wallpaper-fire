import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { PlayListState, PlayList } from "./state";

const getters: GetterTree<PlayListState, RootState> = {
    getAll: (state, getters, rootState, rootGetters): PlayList[] => {
        const db = rootGetters["db/get"];
        const playlist = db.get("playlist.all").value();
        return playlist;
    },
    create: (state, getters, rootState, rootGetters) => (playlist: PlayList) => {
        const db = rootGetters["db/get"];
        const id = db.get("playlist.lastId").value();
        playlist = {
            ...playlist,
            id
        };
        db.get("playlist.all").push(playlist).write();
        db.set("playlist.lastId", id + 1).write();
        return playlist;
    },
    update: (state, getters, rootState, rootGetters) => (id: number, playlist: PlayList) => {
        const db = rootGetters["db/get"];
        db.get("playlist.all")
            .find({ id })
            .assign(playlist)
            .write();
    }
};

export default getters;
