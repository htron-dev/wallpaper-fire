import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { WallpaperState, Wallpaper } from "./state";
const { remote } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
const { promisify } = window.require("util");
const writeFileAsync = promisify(fs.writeFile);

const actions: ActionTree<WallpaperState, RootState> = {
    async create ({ rootGetters, dispatch }, wallpaper: Wallpaper) {
        if (!wallpaper.path) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid path", { root: true });
        }

        if (!wallpaper.title) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid title", { root: true });
        }

        if (wallpaper.thumb && wallpaper.thumb !== "") {
            wallpaper.thumb = await dispatch("uploadWallpaperThumbnail", {
                base64: wallpaper.thumb, title: wallpaper.title
            });
        }
        const db = rootGetters["db/get"];
        db.get("wallpapers.all").insert(wallpaper).write();
    },
    async edit ({ rootGetters, dispatch }, { id, wallpaper }: { id: number, wallpaper: Wallpaper}) {
        if (!wallpaper.path) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid path", { root: true });
        }

        if (!wallpaper.title) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid title", { root: true });
        }

        // get old wallpaper
        const oldWallpaper: Wallpaper = rootGetters["wallpaper/findById"](id);

        if (oldWallpaper.thumb && wallpaper.thumb) {
            wallpaper.thumb = await dispatch("uploadWallpaperThumbnail", {
                base64: wallpaper.thumb, title: wallpaper.title
            });
        } else if (!oldWallpaper.thumb && wallpaper.thumb) {
            wallpaper.thumb = await dispatch("uploadWallpaperThumbnail", {
                base64: wallpaper.thumb, title: wallpaper.title
            });
        }
        const db = rootGetters["db/get"];

        db.get("wallpapers.all")
            .updateById(id, wallpaper)
            .write();

        dispatch("showSuccessNotification", "Wallpaper updated", { root: true });
    },
    async delete ({ rootGetters, dispatch }, id: number) {
        if (!id) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid id", { root: true });
        }
        const db = rootGetters["db/get"];
        const wallpaper: Wallpaper = rootGetters["wallpaper/findById"](id);
        if (!wallpaper) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] can't find wallpaper", { root: true });
        }
        if (wallpaper.thumb) {
            await dispatch("deleteWallpaperThumbnail", wallpaper.thumb);
        }

        db.get("wallpapers.all").remove({ id }).write();
        dispatch("showSuccessNotification", "Wallpaper deleted", { root: true });
    },
    async uploadWallpaperThumbnail ({ rootGetters, dispatch }, { base64, title }: { base64: string, title: string }) {
        try {
            let base64Data = base64.replace(/^data:image\/png;base64,/, "");
            const filePath = `${remote.app.getPath("userData")}/wallpaperFire/thumbnails/${Date.now()}-${title}`;
            await writeFileAsync(filePath, base64Data, "base64");
            return filePath;
        } catch (error) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] Error creating thumb", { root: true });
            return null;
        }
    },
    async deleteWallpaperThumbnail ({ rootGetters, dispatch }, path: string) {
        fs.unlink(path, (err: any) => {
            if (err) {
                dispatch("showErrorNotification", "[WALLPAPER MODULE] error when delete wallpaper thumb", { root: true });
            }
        });
    }
};

export default actions;
