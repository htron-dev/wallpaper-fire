import { RootState } from "@/store";
import { MutationTree } from "vuex";

const mutations: MutationTree<RootState> = {

    SET_WALLPAPERS (state, wallpapers) {
        state.wallpapers.all = wallpapers;
    },
    SET_CURRENT_WALLPAPER(state, wallpaper: any){
        state.wallpapers.current = wallpaper;
    }

};

export default mutations;
