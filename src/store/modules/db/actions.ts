import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { DBState } from "./state";
const low = window.require("lowdb");
const FileSync = window.require("lowdb/adapters/FileSync");
const actions: ActionTree<DBState, RootState> = {
    setDB ({ state, commit }) {
        const adapter = new FileSync(state.path);
        const db = low(adapter);
        const defaultBD = {
            appPath: "",
            app: {
                window: {
                    heigth: 900,
                    width: 600
                }
            },
            history: {
                lastWallpaperId: null,
                lastPlaylistId: null
            },
            wallpapers: {
                lastId: 1,
                all: []
            },
            playlist: {
                lastId: 1,
                all: []
            }
        };

        db.defaults(defaultBD).write();

        commit("SET_DB", db);
    }
};

export default actions;
