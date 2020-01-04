import { RootState } from "@/store";
import { ActionTree } from "vuex";
const { remote } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");

const actions: ActionTree<RootState, RootState> = {
    
    async setWallpapers ({ commit, rootGetters }) {
        const db = rootGetters["db/get"];
        const wallpapers = db.get("wallpapers.all").value();        
        commit("SET_WALLPAPERS", wallpapers);
    },
    async setDescktopWallpaper ({ rootGetters,commit, dispatch }, wallpaper: any) {
        
        if(!wallpaper){
            throw new Error("Invalid wallpaper");
        }

        const db = rootGetters["db/get"];
        db.set("wallpapers.current", wallpaper).write();
        commit("SET_CURRENT_WALLPAPER", wallpaper);
        dispatch("kde/setWallpaperVideo", { root: true });
    },
    async addWallpaper ({ rootGetters, dispatch }, wallpaper) {        
        if (!wallpaper.path) {
            throw new Error("Invalid path");
        }

        if (!wallpaper.title) {
            throw new Error("Invalid title");
        } 
        
        const db = rootGetters["db/get"];

        const id = db.get("wallpapers.lastId").value();
        wallpaper = {
            ...wallpaper,
            id
        }
    
        db.get('wallpapers.all').push(wallpaper).write();
        db.set("wallpapers.lastId", id + 1).write();

        dispatch("setWallpapers");
    },
    async deleteWallpaper ({ rootGetters, dispatch }, id: number) {
        console.log(id);
        if (!id) {
            throw new Error("Invalid id");
        }
        const db = rootGetters["db/get"];

        console.log(id)

        db.get("wallpapers.all").remove({id}).write();
        
        dispatch("setWallpapers");

    }
};

export default actions;
