import { MutationTree } from "vuex";
import { WallpaperState } from "./state";

const mutations: MutationTree<WallpaperState> = {
    SET_WALLPAPERS (state, wallpapers) {
        state.wallpapers = wallpapers;
    },
    SET_CURREMT_WALLPAPER (state, wallpaper) {
        state.current = wallpaper;
    }
};

export default mutations;
