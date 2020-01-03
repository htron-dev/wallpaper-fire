
export type RootState = {
    appPath: string
    videos: {
        path: string, // pass of videos folder
        all: string[], // array with the name of all videos
        current: string | null, // the name of the curren video playing
    }
}
