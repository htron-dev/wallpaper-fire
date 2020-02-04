import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { WallpaperState, Wallpaper } from "./state";
const { remote } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");

const actions: ActionTree<WallpaperState, RootState> = {
    async create ({ rootGetters, dispatch }, wallpaper: Wallpaper) {
        if (!wallpaper.path) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid path", { root: true });
        }

        if (!wallpaper.title) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid title", { root: true });
        }

        if (wallpaper.thumb && wallpaper.thumb !== "") {
            const base64Data = wallpaper.thumb.replace(/^data:image\/png;base64,/, "");
            const filePath = `${remote.app.getPath("userData")}/wallpaperFire/thumbnails/${Date.now()}-${wallpaper.title}`;
            await fs.writeFile(filePath, base64Data, "base64", function (err: any) {
                if (err) {
                    dispatch("showErrorNotification", "[WALLPAPER MODULE] can't create thubnail", { root: true });
                }
            });

            wallpaper.thumb = filePath;
        }
        const db = rootGetters["db/get"];

        const id = db.get("wallpapers.lastId").value();
        wallpaper = {
            ...wallpaper,
            id
        };
        db.get("wallpapers.all").push(wallpaper).write();
        db.set("wallpapers.lastId", id + 1).write();
    },
    async delete ({ rootGetters, dispatch }, id: number) {
        console.log(id);
        if (!id) {
            throw new Error("Invalid id");
        }
        const db = rootGetters["db/get"];

        db.get("wallpapers.all").remove({ id }).write();
    }
};

export default actions;
