import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { PlayListState } from "./state";

const getters: GetterTree<PlayListState, RootState> = {
    getAll: (state, getters, rootState, rootGetters) => {
        const db = rootGetters["db/get"];
        const playlist = db.get("playlist.all").value();
        return playlist;
    }
};

export default getters;
