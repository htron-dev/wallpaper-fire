import { RootState } from "@/store";
import { MutationTree } from "vuex";

const mutations: MutationTree<RootState> = {

    SET_WALLPAPERS (state, wallpapers) {
        state.wallpapers.all = wallpapers;
    },

};

export default mutations;
