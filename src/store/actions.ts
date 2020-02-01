import { RootState } from "@/store";
import { ActionTree } from "vuex";
import { Wallpaper } from './modules/wallpaper/state';
import state from './modules/playlist/state';
const { remote } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");

const actions: ActionTree<RootState, RootState> = {

    setup ({ commit, rootGetters, dispatch }) {
        const db = rootGetters["db/get"];
        const history = db.get("history").value();
        if (history.lastPlaylistId) {
            const playlist = rootGetters["playlist/findById"](history.lastPlaylistId);
            dispatch("playlist/setPlaylist", playlist);
        }
        if (history.lastWallpaperId) {
            const wallpaper = rootGetters["wallpaper/findById"](history.lastWallpaperId);
            dispatch("setDescktopWallpaper", wallpaper);
        }
    },
    
    async setWallpapers ({ commit, rootGetters }) {
        const db = rootGetters["db/get"];
        const wallpapers = db.get("wallpapers.all").value();        
        commit("SET_WALLPAPERS", wallpapers);
    },
    async setDescktopWallpaper ({ rootGetters, dispatch }, wallpaper: Wallpaper) {
        
        if(!wallpaper){
            throw new Error("Invalid wallpaper");
        }

        const options = {
            videoPath: wallpaper.path,
        };

        dispatch("kde/setWallpaperVideo", options, { root: true });

        const db = rootGetters["db/get"];
        db.set("history.lastWallpaperId", wallpaper.id).write();
    },
    async addWallpaper ({ rootGetters, dispatch }, wallpaper: Wallpaper) {        
        if (!wallpaper.path) {
            throw new Error("Invalid path");
        }

        if (!wallpaper.title) {
            throw new Error("Invalid title");
        }

        if (wallpaper.thumb && wallpaper.thumb !== "") {
            const base64Data = wallpaper.thumb.replace(/^data:image\/png;base64,/, "");
            const filePath = `${remote.app.getPath("userData")}/wallpaperFire/thumbnails/${Date.now()}-${wallpaper.title}`;
            await fs.writeFile(filePath, base64Data, "base64", function (err) {
                console.log(err);
            });

            wallpaper.thumb = filePath;
        }
        const db = rootGetters["db/get"];

        const id = db.get("wallpapers.lastId").value();
        wallpaper = {
            ...wallpaper,
            id
        }
        db.get("wallpapers.all").push(wallpaper).write();
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
