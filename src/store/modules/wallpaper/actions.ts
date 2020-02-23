import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { WallpaperState, Wallpaper } from "./state";
import { PlayList } from "../playlist/state";
const { remote } = window.require("electron");
const fs = window.require("fs");
const { promisify } = window.require("util");
const writeFileAsync = promisify(fs.writeFile);

const actions: ActionTree<WallpaperState, RootState> = {
    setWallpapers ({ rootGetters, commit }) {
        const db = rootGetters["db/get"];
        const wallpapers = db.get("wallpapers.all").value();
        commit("SET_WALLPAPERS", wallpapers);
    },
    async create ({ rootGetters, dispatch }, wallpaper: Wallpaper) {
        if (!wallpaper.path) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid path", { root: true });
        }

        if (!wallpaper.title) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid title", { root: true });
        }
        // set timestam date
        wallpaper.timestamp = Date.now();

        const db = rootGetters["db/get"];
        const id = db.get("wallpapers.all").insert(wallpaper).value().id;

        if (wallpaper.thumb && wallpaper.thumb !== "") {
            wallpaper.thumb = await dispatch("uploadWallpaperThumbnail", {
                base64: wallpaper.thumb, id
            });
        }
        db.write();
    },
    async edit ({ rootGetters, dispatch }, { id, wallpaper }: { id: number; wallpaper: Wallpaper}) {
        if (!wallpaper.path) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid path", { root: true });
        }

        if (!wallpaper.title) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] invalid title", { root: true });
        }

        // get old wallpaper
        const oldWallpaper: Wallpaper = JSON.parse(JSON.stringify(rootGetters["wallpaper/findById"](id)));

        // if is a file directory
        if (wallpaper.thumb && !wallpaper.thumb.includes("file://")) {
            if (oldWallpaper.thumb && wallpaper.thumb) {
                wallpaper.thumb = await dispatch("uploadWallpaperThumbnail", {
                    base64: wallpaper.thumb, id
                });
            } else if (!oldWallpaper.thumb && wallpaper.thumb) {
                wallpaper.thumb = await dispatch("uploadWallpaperThumbnail", {
                    base64: wallpaper.thumb, id
                });
            }
        }
        const db = rootGetters["db/get"];

        db.get("wallpapers.all")
            .updateById(id, wallpaper)
            .write();

        if (oldWallpaper.thumb && wallpaper.thumb === null) {
            await dispatch("deleteWallpaperThumbnail", oldWallpaper.thumb);
        } else if (oldWallpaper.thumb && wallpaper.thumb) {
            await dispatch("deleteWallpaperThumbnail", oldWallpaper.thumb);
        }

        dispatch("showSuccessNotification", "Wallpaper updated", { root: true });
    },
    async delete ({ rootGetters, dispatch }, id: string) {
        const db = rootGetters["db/get"];
        const playlists: PlayList[] = rootGetters["playlist/getAll"];
        playlists.forEach(p => {
            if (p.wallpaperIds.includes(id)) {
                p.wallpaperIds.splice(p.wallpaperIds.indexOf(id), 1);
                db.get("playlist.all").updateById(p.id, p);
            }
        });
        db.write();
        const wallpaper: Wallpaper = rootGetters["wallpaper/findById"](id);
        if (!wallpaper) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] can't find wallpaper", { root: true });
        }
        if (wallpaper.thumb) {
            await dispatch("deleteWallpaperThumbnail", wallpaper.thumb);
        }

        db.get("wallpapers.all").removeById(id).write();
        dispatch("showSuccessNotification", "Wallpaper deleted", { root: true });
    },
    async uploadWallpaperThumbnail ({ dispatch }, { base64, id }) {
        try {
            const base64Data = base64.replace(/^data:image\/png;base64,/, "");
            const filePath = `${remote.app.getPath("userData")}/thumbnails/${Date.now()}-${id}`;
            await writeFileAsync(filePath, base64Data, "base64");
            return `file://${filePath}`;
        } catch (error) {
            dispatch("showErrorNotification", "[WALLPAPER MODULE] Error creating thumb", { root: true });
            return null;
        }
    },
    async deleteWallpaperThumbnail ({ dispatch }, path: string) {
        path = path.replace("file://", "");
        fs.unlink(path, (err: any) => {
            if (err) {
                dispatch("showErrorNotification", "[WALLPAPER MODULE] error when delete wallpaper thumb", { root: true });
            }
        });
    }
};

export default actions;
