// make a fake require for electron requests
const _require: any = () => {
    return {
        promisify: (fn: Function) => fn,
        remote: {
            app: {
                getAppPath: () => "./",
                getPath: () => "./"
            },
            dialog: {
                showOpenDialog: async () => {
                    return {
                        filePaths: ["./../../../../resources/wallpapers/images/sample-1.jpg"]
                    };
                }
            }
        }
    };
};
window.require = _require;
const app = document.createElement("div");
app.setAttribute("data-app", "true");
document.body.append(app);
