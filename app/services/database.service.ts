// node
import fs from "fs";
import { promisify } from "util";

import { app } from "electron";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import lodashId from "lodash-id";

const writeFile = promisify(fs.writeFile);
const configPath = `${app.getPath("userData")}/config.json`;

function connect () {
    const adapter = new FileSync(configPath);
    const db: any = low(adapter);
    db._.mixin(lodashId);
    return db;
};

async function setup () {
    try {
        if (!fs.existsSync(`${app.getPath("userData")}/thumbnails`)) {
            fs.mkdirSync(`${app.getPath("userData")}/thumbnails`);
            const defaultBD = {
                appPath: "",
                app: {
                    window: {
                        heigth: 900,
                        width: 600
                    }
                },
                user: {
                    notifications: []
                },
                history: {
                    lastWallpaperId: null,
                    lastPlaylistId: null
                },
                wallpapers: {
                    lastId: 1,
                    all: []
                },
                playlist: {
                    lastId: 1,
                    all: []
                }
            };

            await writeFile(configPath, JSON.stringify(defaultBD));
            const db = connect();
            const notification = {
                color: "info",
                message: "[APP] App files created"
            };
            db.get("user.notifications").insert(notification).write();
            return configPath;
        } else {
            return configPath;
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const DatabaseService = {
    setup,
    connect
};
