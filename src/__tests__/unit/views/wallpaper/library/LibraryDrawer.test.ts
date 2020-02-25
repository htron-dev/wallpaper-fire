// libraris
import { mount } from "@vue/test-utils";
import { expect } from "chai";
import * as useStore from "@/store/use-store";
import sinon from "sinon";
import Vuetify from "vuetify";

// component
import LibraryDrawer from "@/views/wallpaper/library/LibraryDrawer.vue";

describe("LibraryDrawer.vue", () => {
    let stub: any;
    const dispatchSpy = sinon.spy();
    const component = (data?: any) => mount(LibraryDrawer, {
        propsData: {
            value: true
        },
        vuetify: new Vuetify(),
        ...data
    });

    before("set the stubs", () => {
        // stub the use store
        stub = sinon.stub(useStore, "useStore").callsFake((): any => ({
            dispatch: dispatchSpy
        }));
    });
    after("clear stubs", () => {
        stub.restore();
    });

    it("should show a video component with the path", () => {
        const wallpaper = {
            path: "./../../../../resources/wallpapers/images/sample-1.jpg",
            thumb: "./../../../../resources/wallpapers/images/sample-1.jpg",
            title: "Title"
        };
        const wrapper = component({ propsData: { wallpaper } });
        const videoHTML = wrapper.find(".library-drawer-video");
        // expect the component to exist
        expect(videoHTML.exists()).to.be.equal(true);
        // expect have the correct src
        expect(videoHTML.attributes().src).to.be.equal(wallpaper.path);
    });

    it("should when click in button dispatch a function in store to set a video as descktop wallpaper", () => {
        const wallpaper = {
            path: "./../../../../resources/wallpapers/images/sample-1.jpg",
            thumb: "./../../../../resources/wallpapers/images/sample-1.jpg",
            title: "Title"
        };
        const wrapper = component({ propsData: { wallpaper } });
        // get button component
        const button = wrapper.find(".library-drawer-button");
        // expect the component to exist
        expect(button.exists()).to.be.equal(true);
        // trigger the click
        button.trigger("click");

        // expect have called the dispacthSpy function
        expect(dispatchSpy.calledWith("setDescktopWallpaper")).to.be.equal(true);
    });
});
