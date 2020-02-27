// librarys
import { mount } from "@vue/test-utils";
import { expect } from "chai";
import sinon from "sinon";
// component
import WThumbnailPicker from "@/components/WThumbnailPicker/index.vue";
import * as pickerFunctons from "@/components/WThumbnailPicker/functions";
import { fakePicker } from "@/__tests__/helper/w-thubnail-picker.helper";
import faker from "faker";

describe("WThumbnailPicker", () => {
    const component = () => mount({
        template: "<div><w-thumbnail-picker :path='path' v-model='model' /></div>",
        data () {
            return {
                path: faker.internet.url(),
                model: null
            };
        },
        components: {
            WThumbnailPicker: WThumbnailPicker
        }
    });
    let pickerStub: any;
    before("set stubs", () => {
        pickerStub = sinon.stub(pickerFunctons, "thumbnailPicker").callsFake(fakePicker);
    });
    after("restore stubs", () => {
        pickerStub.restore();
    });
    it("should set the v-model when start the component", async () => {
        const wrapper = component();
        // get picker
        const picker = wrapper.find(WThumbnailPicker);
        // await nextTick
        await picker.vm.$nextTick();
        // expect the thumbnail to be seted ot null
        expect(picker.vm.$data.state.model).to.not.be.equal(null);
    });
    it("should set thumbnail to null when click remove button in thumbnail card", async () => {
        const wrapper = component();
        // get picker
        const picker = wrapper.find(WThumbnailPicker);
        // await set the state
        await picker.vm.$nextTick();
        // get button
        const removeButton = picker.find(".w-thumbnail-picker-remove-thumb-button");
        // await nextTick
        await picker.vm.$nextTick();
        // trigger click event
        removeButton.trigger("click");
        // await nextTick
        await picker.vm.$nextTick();
        // expect the thumbnail to be seted ot null
        expect(picker.vm.$data.state.model).to.be.equal(null);
    });
    it("should set a random thumbnail click random", async () => {
        const wrapper = component();
        // get picker
        const picker = wrapper.find(WThumbnailPicker);
        // await set the state
        await picker.vm.$nextTick();
        // get the actual thubnail
        const firstThumbnail = picker.vm.$data.state.model;
        // get button
        const randomButton = picker.find(".w-thumbnail-picker-random-thumb-button");
        // trigger click event
        randomButton.trigger("click");
        // await nextTick
        await picker.vm.$nextTick();
        // expect the thumbnail to be diferent of the first one
        expect(picker.vm.$data.state.model).to.not.be.equal(firstThumbnail);
    });

    it("should show the slide select thumbnail when click in manual button", async () => {
        const wrapper = component();
        // get picker
        const picker = wrapper.find(WThumbnailPicker);
        // await set the state
        await picker.vm.$nextTick();
        // get button
        const manualButton = picker.find(".w-thumbnail-picker-manual-thumb-button");
        // trigger click event
        manualButton.trigger("click");
        // await nextTick
        await picker.vm.$nextTick();
        // expect set the mode to manual
        expect(picker.vm.$data.state.mode).to.be.equal("manual");
        // expect the thumbnail to be seted ot null
        expect(picker.find(".w-thumbnail-picker-slide").exists()).to.be.equal(true);
    });
    it("should change thumbnail when move the slide", async () => {
        const wrapper = component();
        // get picker
        const picker = wrapper.find(WThumbnailPicker);
        // set the mode to manual
        picker.setData({ state: { mode: "manual" } });
        // await set the state
        await picker.vm.$nextTick();
        // get first thumbnail
        const firstThumbnail = picker.vm.$data.state.model;
        // change slide value
        picker.setData({ state: { slideComputed: 70 } });
        // await nextTick
        await picker.vm.$nextTick();
        // expect the thumbnail to be seted ot null
        expect(picker.vm.$data.state.model).to.not.be.equal(firstThumbnail);
    });
});
