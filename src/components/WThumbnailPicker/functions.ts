type Events = "ready" | "setThumbnail";
type Observers = {
    [key in Events]: Function[]
};

export function thumbnailPicker (element: HTMLElement, path: string) {
    let loaded = false;
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");
    const image = document.createElement("img");
    const context = canvas.getContext("2d");
    const extname = path.split(".");
    const source = document.createElement("source");
    source.src = path;
    source.type = `video/${extname[extname.length - 1]}`;

    const observers: Observers = {
        ready: [],
        setThumbnail: []
    };

    function on (event: Events, fn: Function) {
        observers[event].push(fn);
    };

    function notfifyAll (event: Events, value?: any) {
        if (observers[event]) {
            observers[event].forEach(fn => fn(value));
        }
    }

    // set video attributes
    video.appendChild(source);
    video.id = "thumbnail-picker";
    video.preload = "auto";

    // add image to dom element
    element.appendChild(image);

    // function to set the time in seconds
    function init () {
        // set image attributes
        image.style.width = "100%";
        image.style.height = "250px";
        image.style.objectFit = "contain";
        image.src = require("@/assets/512x512.png");
    }
    // function to set the time in seconds
    function reset () {
        init();
    }
    function setThumbnail (src: string) {
        image.setAttribute("src", src);
        image.style.objectFit = "cover";
        // notify all observers
        notfifyAll("setThumbnail", src);
    }
    // function to set the time in seconds
    function setTime (time: number) {
        video.currentTime = time;
    }

    // function to set the time by percentage
    function setPercentage (number: number) {
        const percentage = number / 100;
        video.currentTime = video.duration * percentage;
    }

    video.addEventListener("durationchange", () => {
        if (video.duration === Infinity || isNaN(video.duration)) {
            video.currentTime = 99 * 99 * 99;
        } else {
            setTime(1);
        }
        init();
    });

    video.addEventListener("seeked", () => {
        if (!context) {
            return;
        }
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            if (!blob) {
                return;
            };
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    // set preview
                    setThumbnail(base64.toString());
                    if (!loaded) {
                        notfifyAll("ready");
                        loaded = true;
                    }
                }
            };
        });
    });

    return {
        setPercentage,
        setTime,
        reset,
        setThumbnail,
        on
    };
}
