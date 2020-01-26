import { PlayListState } from "@/store/modules/playlist/state";
export type RootState = {
    appPath: string,
    app: {
        heigth: string,
        width: string
    },
    history: {
        lastWallpaperId: null | number,
        lastPlaylistId: null | number,
    },
    wallpapers: {
        lastId: number,
        all: string[], // array with the name of all videos
    },
    playlist: PlayListState,
}
