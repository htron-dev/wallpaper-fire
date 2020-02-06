import { RootState } from "@/store";
import { MutationTree } from "vuex";

const mutations: MutationTree<RootState> = {

    ADD_NOTIFICATION (state, notification) {
        state.notifications.push(notification);
    },
    SET_USER_NOTIFICATIONS (state, notifications) {
        state.user.notifications = notifications;
    }

};

export default mutations;
