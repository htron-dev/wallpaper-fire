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
    async edit ({ rootGetters, dispatch }, data: { id: number, wallpaper: Wallpaper}) {
        if (!data.wallpaper.path) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid path", { root: true });
        }

        if (!data.wallpaper.title) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid title", { root: true });
        }

        // get old wallpaper
        const oldWallpaper: Wallpaper = rootGetters["wallpaper/findById"](data.id);

        if (oldWallpaper.thumb && data.wallpaper.thumb) {
            const base64Data = data.wallpaper.thumb.replace(/^data:image\/png;base64,/, "");
            await fs.writeFile(oldWallpaper.thumb, base64Data, "base64", function (err: any) {
                if (err) {
                    dispatch("showErrorNotification", "[WALLPAPER MODULE] can't create thubnail", { root: true });
                }
            });
            data.wallpaper.thumb = oldWallpaper.thumb;
        } else if (!oldWallpaper.thumb && data.wallpaper.thumb) {
            const base64Data = data.wallpaper.thumb.replace(/^data:image\/png;base64,/, "");
            const filePath = `${remote.app.getPath("userData")}/wallpaperFire/thumbnails/${Date.now()}-${data.wallpaper.title}`;
            await fs.writeFile(filePath, base64Data, "base64", function (err: any) {
                if (err) {
                    dispatch("showErrorNotification", "[WALLPAPER MODULE] can't create thubnail", { root: true });
                }
            });

            data.wallpaper.thumb = filePath;
        }
        const db = rootGetters["db/get"];

        db.get("wallpapers.all")
            .find({ id: data.id })
            .assign(data.wallpaper)
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
    async deleteWallpaperThumbnail ({ rootGetters, dispatch }, path: string) {
        fs.unlink(path, (err: any) => {
            if (err) {
                dispatch("showErrorNotification", "[WALLPAPER MODULE] error when delete wallpaper thumb", { root: true });
            }
        });
    }
};

export default actions;
