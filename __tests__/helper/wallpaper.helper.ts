import { Wallpaper } from "@/store";
import faker from "faker";

export function createWallpaperList (qtn: number = 5): Wallpaper[] {
    const source: string = require("../../resources/wallpapers/images/sample-1.jpg");
    const wallpapers: Wallpaper[] = []
    for (let i = 0; i < qtn; i++) {
        wallpapers.push({
            id: i + 1,
            title: `Wallpaper - ${i + 1}`,
            path: source,
            thumb: source,
            extname: ".jpg",
            config: {},
            timestamp: faker.date.past(10, new Date()).getTime()
        });
    }
    return wallpapers;
}