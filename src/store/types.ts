
export type RootState = {
    appPath: string,
    wallpapers: {
        lastId: number,
        current: null | any, // current wallpaper active
        all: string[], // array with the name of all videos
        config: any, // the name of the curren video playing
    }
}
