/**
 *  Module to handle the configurations and data storange of app
 *  Is used lowdb to handle the management of json
 */
const { remote } = window.require("electron");

export type DBState = {
    path: string,
    db: object | null
};

const state: DBState = {
    path: remote.app.getPath("userData") + "/wallpaperFire/config.json",
    db: null
}

export default state;