export type Wallpaper = {
    id: number | string;
    path: string;
    title: string;
    description?: string;
    thumb: string | null;
    config: any;
    extname: string;
    timestamp: number;
};
export type WallpaperState = {
    current: Wallpaper | null;
    wallpapers: Wallpaper[];
};

const state: WallpaperState = {
    current: null,
    wallpapers: []
};

export default state;
