const { dialog } = window.require("electron").remote;

export async function getFile (options: any): Promise<string> {
    try {
        const file = await dialog.showOpenDialog(options);
        if (!file || file.canceld || !file.filePaths || file.filePaths.length === 0) {
            throw new Error("Canceled");
        }

        return `file://${file.filePaths[0]}`;
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    getFile
};
