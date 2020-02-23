import { Wallpaper } from "@/store";
import faker from "faker";
export function createWallpaperList (qtn = 5): Wallpaper[] {
    const wallpapers: Wallpaper[] = [];
    let source;
    for (let i = 0; i < qtn; i++) {
        source = faker.image.dataUri(400, 400);
        wallpapers.push({
            id: faker.random.uuid(),
            title: faker.name.title(),
            path: source,
            thumb: source,
            extname: ".jpg",
            config: {},
            timestamp: faker.date.past(10, new Date()).getTime()
        });
    }
    return wallpapers;
}
