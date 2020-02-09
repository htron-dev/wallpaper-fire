export type Wallpaper = {
    id: number;
    path: string;
    title: string;
    description?: string;
    thumb: string | null;
    config: any;
};
export type WallpaperState = {
    current: Wallpaper | null;
};

const state: WallpaperState = {
    current: null
};

export default state;
