const exec = window.require("child_process").exec;
const getScript = (file: string) => {
    const plasmaScript = `dbus-send --session --dest=org.kde.plasmashell --type=method_call /PlasmaShell org.kde.PlasmaShell.evaluateScript 'string:
    var Desktops = desktops();                                                                                                                       
    for (i=0;i<Desktops.length;i++) {
            d = Desktops[i];
            d.wallpaperPlugin = "smartvideowallpaper";
            d.currentConfigGroup = Array("Wallpaper",
                                        "smartvideowallpaper",
                                        "General");
            d.writeConfig("FillMode", 0);
            d.writeConfig("VideoWallpaperBackgroundVideo", "file://${file}");
    }'`;

    return plasmaScript;
};

const actions = {
    async setWallpaperVideo ({ rootState }: any) {
        const command = getScript(rootState.videos.current as string);
        try {
            const { stdout, stderr } = await exec(command);
            console.log("sucess", stdout, stderr);
        } catch (error) {
            console.log(error);
        }
    }
};

export default actions;
