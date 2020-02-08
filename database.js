// node
const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

const { app } = require("electron");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");
//
const configPath = `${app.getPath("userData")}/config.json`;
function connect () {
    const adapter = new FileSync(configPath);
    const db = low(adapter);
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
        throw error;
    }
};

module.exports = {
    setup,
    connect
};
