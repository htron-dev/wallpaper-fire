export type Wallpaper = {
    id: number;
    path: string;
    title: string;
    description?: string;
    thumb: string | null;
    config: any;
};
export type WallpaperState = {};

const state: WallpaperState = {};

export default state;
