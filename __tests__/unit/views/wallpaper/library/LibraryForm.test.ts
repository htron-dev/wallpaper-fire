// libraris
import { mount, Wrapper } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import Vuetify from "vuetify";
// function
import * as useStore from "@/store/use-store";
import * as compostionFunctions from "@/views/wallpaper/library/functions";
// component
import LibraryForm from "@/views/wallpaper/library/LibraryForm.vue";
import WThumbnailPicker from "@/components/WThumbnailPicker/index.vue";

describe("LibraryForm.vue", () => {
    let wrapper: Wrapper<any> | null;
    let storeStub: any;
    // store dispatch spy
    const dispatchSpy = sinon.spy();
    const component = (data?: any) => mount(LibraryForm, {
        ...data,
        vuetify: new Vuetify(),
        stubs: {
            WThumbnailPicker
        }
    });

    before("Set the stubs", () => {
        storeStub = sinon.stub(useStore, "useStore").callsFake((): any => ({
            dispatch: (action: string, payload?: any) => {
                dispatchSpy(action, payload);
            }
        }));
    });
    after("Clear stubs", () => {
        storeStub.restore();
    });
    beforeEach("Destroy component", () => {
        if (wrapper) {
            wrapper.destroy();
            wrapper = null;
        }
    });
    it("should when created call a function to open native dialog to select a video", async () => {
        // create stub for the getFile function
        const getFileStub = sinon.stub(compostionFunctions, "getFile").callsFake(async (options: any) => {
            getFileSpy(options);
            return "./../../../../resources/wallpapers/images/sample-1.jpg";
        });
        // getfile spy
        const getFileSpy = sinon.spy();
        // init the component
        wrapper = component();
        // expect the spy function to be called
        expect(getFileSpy.called).to.be.equal(true);
        getFileStub.restore();
    });

    it("should have w-thumbnail-picker component", async () => {
        // init the component
        wrapper = component();

        wrapper.setData({
            state: {
                path: "./../../../../resources/wallpapers/images/sample-1.jpg",
                title: "Some title"
            }
        });
        await wrapper.vm.$nextTick();
        // look for WThumbnailPicker
        const picker = wrapper.find(WThumbnailPicker);
        // check if exists
        expect(picker.exists()).to.be.equal(true);
    });
    it("should emit close event when click in close button", async () => {
        // init the component
        wrapper = component();

        const closeButton = wrapper.find(".library-form-close-button");
        // check if button exists
        expect(closeButton.exists()).to.be.equal(true);
        // trigger the click event
        closeButton.trigger("click");
        // await click nextTick
        await wrapper.vm.$nextTick();
        // expect to emited close event
        expect(wrapper.emitted("close").length).to.be.equal(1);
    });
    it("should dispatch a store actions function wallpaper/create when submit the form", async () => {
        // init the component
        wrapper = component();
        wrapper.setData({
            state: {
                path: "./../../../../resources/wallpapers/images/sample-1.jpg",
                title: "Some title",
                thumb: null,
                extname: ".jpg"
            }
        });
        // await click nextTick
        await wrapper.vm.$nextTick();
        // call function
        wrapper.vm.submit();
        // get the current state of inputs
        const wallpaper = JSON.parse(JSON.stringify(wrapper.vm.state));
        // expect to be call the dispacth function
        expect(dispatchSpy.calledWith("wallpaper/create", wallpaper)).to.be.equal(true);
    });
    it("should emit submit and close event when call submit function", async () => {
        // init the component
        wrapper = component();

        wrapper.setData({
            state: {
                path: "./../../../../resources/wallpapers/images/sample-1.jpg",
                title: "Some title",
                thumb: null
            }
        });
        // await nextTick to set the state
        await wrapper.vm.$nextTick();
        // call function
        wrapper.vm.submit();
        // await 2 nextTick to emit the 2 events
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        // expect to be emited the event
        expect(wrapper.emitted("submit").length).to.be.equal(1);
        expect(wrapper.emitted("close").length).to.be.equal(1);
    });

    it("should when have edited-item props edit the item", () => {
        const wallpaper = {
            path: "./../../../../resources/wallpapers/images/sample-1.jpg",
            title: "Some title",
            thumb: null,
            extname: ".jpg"
        };
        // init the component
        wrapper = component({
            propsData: {
                editedItem: wallpaper
            }
        });
        // expec set the state using the props
        expect(wrapper.vm.state).to.include(wallpaper);
    });
    it("should dispatch a store function wallpaper/edit when click in submit button and have a edited-item props", async () => {
        const wallpaper = {
            id: 1,
            path: "./../../../../resources/wallpapers/images/sample-1.jpg",
            description: null,
            title: "Some title",
            thumb: null,
            extname: ".jpg"
        };
        // init the component
        wrapper = component({
            propsData: {
                editedItem: wallpaper
            }
        });
        await wrapper.vm.$nextTick();
        wrapper.vm.submit();
        const id = wallpaper.id;
        delete wallpaper.id;
        // expect to be call the dispacth function
        expect(dispatchSpy.calledWith("wallpaper/edit", { id, wallpaper })).to.be.equal(true);
    });
});
