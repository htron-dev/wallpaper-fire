import { PlayListState } from "@/store/modules/playlist/state";
import { WallpaperState } from "@/store/modules/wallpaper/state";
export type RootState = {
    [prop: string]: any,
    notifications: any[],
    appPath: string,
    app: {
        window: any
    },
    history: {
        lastWallpaperId: null | number,
        lastPlaylistId: null | number,
    },
}
