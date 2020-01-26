export type PlayList = {
    id: number,
    title: string,
    description?: string,
    wallpapersIds: number[],
    thumb: string | null,
    config: {
        delay: number, // number of miliconds to change the wallpapers
    },
};
export type PlayListState = {
    all: PlayList[],
};

const state: PlayListState = {
    all: []
};

export default state;
