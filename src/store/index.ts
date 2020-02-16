import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "@/store";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    state: require("./state").default,
    mutations: require("./mutations").default,
    actions: require("./actions").default,
    modules: modules
});

// export store types
export * from "./types";
export * from "./use-store";
