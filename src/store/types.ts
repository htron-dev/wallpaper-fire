import { PlayListState } from "@/store/modules/playlist/state";
import { WallpaperState } from "@/store/modules/wallpaper/state";
export type RootState = {
    [prop: string]: any,
    notifications: any[],
    app: {
        appPath: string,
        configPath: string,
        window: any
    },
    history: {
        lastWallpaperId: null | number,
        lastPlaylistId: null | number,
    },
}
