import { MutationTree } from "vuex";
import { PlayListState } from "./state";

const mutations: MutationTree<PlayListState> = {
    SET_TIMER (state, timer: any) {
        state.timer = timer;
    },
    CLEAR_TIMER (state) {
        clearInterval(state.timer);
        state.timer = null;
    }
};
export default mutations;
