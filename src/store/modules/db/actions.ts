import { ActionTree } from "vuex"
import { RootState } from "@/store";
import { DBState } from "./state";
const low = window.require('lowdb')
const FileSync = window.require('lowdb/adapters/FileSync')
const actions: ActionTree<DBState, RootState> = {
    setDB({ state, commit }){        
        const adapter = new FileSync(state.path);
        const db = low(adapter);
        const defaultBD: RootState = {
            appPath: "",
            app: {
                heigth: "",
                width: ""
            },
            history: {
                lastWallpaperId: null,
                lastPlaylistId: null,
            },
            wallpapers: {
                lastId: 1,
                all:[]
            },
            playlist: {
                all: []
            }
        };
        
        db.defaults(defaultBD).write();

        commit("SET_DB", db);
    },
}

export default actions;