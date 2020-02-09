import { MutationTree } from "vuex";
import { WallpaperState } from "./state";

const mutations: MutationTree<WallpaperState> = {
    SET_CURREMT_WALLPAPER (state, wallpaper) {
        state.current = wallpaper;
    }
};

export default mutations;
