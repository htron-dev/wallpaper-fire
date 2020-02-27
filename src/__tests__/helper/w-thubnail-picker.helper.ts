import { Events, Observers } from "@/components/WThumbnailPicker/functions";
import faker from "faker";

export function fakePicker (element: HTMLElement, path: string) {
    const image = document.createElement("img");
    image.title = path.split("/").pop() || path;
    element.appendChild(image);
    const observers: Observers = {
        ready: [],
        setThumbnail: []
    };
    function notfifyAll (event: Events, value?: any) {
        if (observers[event]) {
            observers[event].forEach(fn => fn(value));
        }
    }
    const setThumbnail = () => {
        notfifyAll("setThumbnail", `${faker.image.nature()}?random=${Date.now()}`);
    };
    const setPercentage = () => setThumbnail();
    const setTime = () => setThumbnail();
    const reset = () => {
        image.src = faker.image.dataUri();
    };
    function on (event: Events, fn: Function) {
        observers[event].push(fn);
        if (event === "ready") {
            notfifyAll("ready");
        } else if (event === "setThumbnail") {
            setThumbnail();
        }
    };
    return {
        setPercentage,
        setTime,
        reset,
        setThumbnail,
        on
    };
};
