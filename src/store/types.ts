import { PlayListState } from "@/store/modules/playlist/state";
import { WallpaperState } from "@/store/modules/wallpaper/state";
export type RootState = {
    appPath: string,
    app: {
        window: any
    },
    history: {
        lastWallpaperId: null | number,
        lastPlaylistId: null | number,
    },
    wallpapers: WallpaperState,
    playlist: PlayListState,
}
