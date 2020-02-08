import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { DBState } from "./state";
const low = window.require("lowdb");
const lodashId = window.require("lodash-id");
const FileSync = window.require("lowdb/adapters/FileSync");
const actions: ActionTree<DBState, RootState> = {
    init ({ state, commit, rootState }, configPath) {
        const adapter = new FileSync(configPath);
        const db = low(adapter);
        db._.mixin(lodashId);
        commit("SET_DB", db);
    }
};

export default actions;
