import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { DBState } from "./state";

const getters: GetterTree<DBState, RootState> = {
    get: (state) => {
        return state.db;
    }
};

export default getters;
