export type PlayList = {
    id: number;
    title: string;
    description?: string;
    wallpaperIds: number[];
    thumb: string | null;
    config: {
        delay: number, // number of miliconds to change the wallpapers
    },
};
export type PlayListState = {
    timer: any | null;
};

const state: PlayListState = {
    timer: null
};

export default state;
