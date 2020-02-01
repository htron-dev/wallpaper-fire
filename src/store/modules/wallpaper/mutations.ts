import { MutationTree } from "vuex";
import { WallpaperState } from "./state";

const mutations: MutationTree<WallpaperState> = {

    SET_ALL (state, wallpapers) {
        state.all = wallpapers;
    }

};

export default mutations;
