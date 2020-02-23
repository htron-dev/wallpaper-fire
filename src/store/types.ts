
export type RootState = {
    [prop: string]: any;
    notifications: any[];
    app: {
        appPath: string;
        dataPath: string;
        thumbsPath: string;
        window: any;
    };
    history: {
        lastWallpaperId: null | number;
        lastPlaylistId: null | number;
    };
}

// export modules typess
export * from "@/store/modules/playlist/state";
export * from "@/store/modules/wallpaper/state";
