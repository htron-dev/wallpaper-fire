import { RootState } from "@/store";
import { MutationTree } from "vuex";

const mutations: MutationTree<RootState> = {

    ADD_NOTIFICATION (state, notification) {
        state.notifications.push(notification);
    }

};

export default mutations;
