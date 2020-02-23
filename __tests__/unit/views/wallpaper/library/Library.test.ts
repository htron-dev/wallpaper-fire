// libraris
import { mount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
import Vuetify from "vuetify";
// function
import * as useStore from "@/store/use-store";
// component
import Library from "@/views/wallpaper/library/Library.vue";
import LibraryForm from "@/views/wallpaper/library/LibraryForm.vue";
import LibraryItem from "@/views/wallpaper/library/LibraryItem.vue";
import LibraryDrawer from "@/views/wallpaper/library/LibraryDrawer.vue";
import WAlert from "@/components/WAlert/index.vue";
import { createWallpaperList } from "../../../../helper/wallpaper.helper";

// mocks
const wallpapers = createWallpaperList(5);

describe("Library.vue", () => {
    let storeStub: any;
    // store dispatch spy
    const dispatchSpy = sinon.spy();
    const component = (data?: any) => mount(Library, {
        vuetify: new Vuetify(),
        ...data
    });

    before("Set the stubs", () => {
        storeStub = sinon.stub(useStore, "useStore").callsFake((): any => ({
            state: {
                wallpaper: {
                    wallpapers
                }
            },
            dispatch: async (action: string, payload?: any) => {
                dispatchSpy(action, payload);
            }
        }));
    });
    after("Clear stubs", () => {
        storeStub.restore();
    });
    it("should when click in add button show the library-form", async () => {
        const wrapper = component();
        const button = wrapper.find(".library-add-button");
        // trigger the click
        button.trigger("click");
        // await nextTick
        await wrapper.vm.$nextTick();
        // exect the the v-model to be seted
        expect(wrapper.vm.$data.state.dialog).to.be.equal(true);
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect the library-form component to exists
        expect(wrapper.find(LibraryForm).exists()).to.be.equal(true);
        // destroy the component
        wrapper.destroy();
    });
    it("should show a list of libray-item for each wallpaper", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect have same wallpapers
        expect(wrapper.vm.$data.state.wallpapers.length).to.be.equal(wallpapers.length);
        // expect have a library-item for each wallpaper object
        expect(wrapper.findAll(LibraryItem).length).to.be.equal(wallpapers.length);
    });
    it("should when libray-item emit use-wallpaper event dispatch action in store to set as desktop wallpaper", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one library-item
        const libraryItem = wrapper.find(LibraryItem);
        // await nextTick
        await wrapper.vm.$nextTick();
        // trigger the event
        libraryItem.vm.$data.useWallpaper();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect call action with the library-item wallpaper
        expect(dispatchSpy.calledWith("setDescktopWallpaper", libraryItem.vm.$props.wallpaper)).to.be.equal(true);
    });
    it("should when libray-item emit click event set the selected wallpaper", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one wallpaper
        const libraryItem = wrapper.find(LibraryItem);
        // emit event
        libraryItem.vm.$emit("click");
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect the selected item to have the same wallpaper as  library-item
        expect(wrapper.vm.$data.state.selected).to.be.equal(libraryItem.vm.$props.wallpaper);
    });
    it("should when libray-item emit click event show library-drawer", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one wallpaper
        const libraryItem = wrapper.find(LibraryItem);
        // emit event
        libraryItem.vm.$emit("click");
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect state drawer to be true
        expect(wrapper.vm.$data.state.drawer).to.be.equal(true);
        // get library-drawer
        const libraryDrawer = wrapper.find(LibraryDrawer);
        // expect the component to exists
        expect(libraryDrawer.exists()).to.be.equal(true);
        // expect the component to have same wallpaper that library-item
        expect(libraryDrawer.vm.$props.wallpaper).to.be.equal(libraryItem.vm.$props.wallpaper);
    });
    it("should when libray-item emit edit event set the edited-item with the wallpaper", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one library-item
        const libraryItem = wrapper.find(LibraryItem);
        // await nextTick
        await wrapper.vm.$nextTick();
        // trigger the event
        libraryItem.vm.$data.editWallpaper();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect state dialog to be true
        expect(wrapper.vm.$data.state.dialog).to.be.equal(true);
        // expect edited-item to be equal library-item wallpaper
        expect(wrapper.vm.$data.state.editedItem).to.be.equal(libraryItem.vm.$props.wallpaper);
    });
    it("should when libray-item emit edit event show library-form with edited-item equals wallpaper library-item", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one library-item
        const libraryItem = wrapper.find(LibraryItem);
        // await nextTick
        await wrapper.vm.$nextTick();
        // trigger the event
        libraryItem.vm.$data.editWallpaper();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect state dialog to be true
        expect(wrapper.vm.$data.state.dialog).to.be.equal(true);
        // get library-form
        const libraryForm = wrapper.find(LibraryForm);
        // expect the component to exists
        expect(libraryForm.exists()).to.be.equal(true);
        // expect the component to have same wallpaper that library-item
        expect(libraryForm.vm.$props.editedItem).to.be.equal(libraryItem.vm.$props.wallpaper);
    });
    it("should when libray-item emit delete event set the selected wallpaper and show the alert-dialog", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one library-item
        const libraryItem = wrapper.find(LibraryItem);
        // await nextTick
        await wrapper.vm.$nextTick();
        // trigger the event
        libraryItem.vm.$data.deleteWallpaper();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect state dialog to be true
        expect(wrapper.vm.$data.state.alert).to.be.equal(true);
        // expect edited-item to be equal library-item wallpaper
        expect(wrapper.vm.$data.state.editedItem).to.be.equal(libraryItem.vm.$props.wallpaper);
    });
    it("should when alert-dialog emit positive call store action to delete the wallpaper", async () => {
        const wrapper = component();
        // await nextTick
        await wrapper.vm.$nextTick();
        // expect get one library-item
        const libraryItem = wrapper.find(LibraryItem);
        // await nextTick
        await wrapper.vm.$nextTick();
        // trigger the event
        libraryItem.vm.$data.deleteWallpaper();
        // trigger positive response for the alert
        wrapper.find(WAlert).vm.$emit("positive");
        // expec call the dispatche function
        expect(dispatchSpy.calledWith("wallpaper/delete", libraryItem.vm.$props.wallpaper.id)).to.be.equal(true);
    });
});
