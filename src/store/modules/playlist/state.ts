export type PlayList = {
    wallpapersIds: number[],
    config: {
        delay: number, // number of miliconds to change the wallpapers
    },
};
export type PlayListState = {
    all: PlayList[],
};

const state: PlayListState = {
    all: []
}

export default state;