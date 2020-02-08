import { MutationTree } from "vuex";
import { DBState } from "./state";

const mutations: MutationTree<DBState> = {
    SET_DB (state, newDb: any) {
        state.db = newDb;
    }
};
export default mutations;
