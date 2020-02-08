import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { WallpaperState, Wallpaper } from "./state";

const getters: GetterTree<WallpaperState, RootState> = {
    getAll: (state, getters, rootState, rootGetters): Wallpaper[] => {
        // get the db
        const db = rootGetters["db/get"];
        // look for the wallpapers
        const wallpapers = db.get("wallpapers.all").value();
        // return the list of wallpapers
        return wallpapers;
    },
    find: (state, getters, rootState, rootGetters) => (filter: { ids: number[] }): Wallpaper[] => {
        // // get the db
        const db = rootGetters["db/get"];
        // // look for the wallpapers
        const wallpapers = db.get("wallpapers.all")
            .filter((w: any) => filter.ids.includes(w.id))
            .value();
        // // return the list of wallpapers filered
        return wallpapers;
    },
    findById: (state, getters, rootState, rootGetters) => (id: number): Wallpaper => {
        // // get the db
        const db = rootGetters["db/get"];
        // // look for the wallpapers
        const wallpapers = db.get("wallpapers.all")
            .find({ id })
            .value();
        // // return the list of wallpapers filered
        return wallpapers;
    }
};

export default getters;
