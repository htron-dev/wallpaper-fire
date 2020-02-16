import LibraryItem from "@/views/wallpaper/library/LibraryItem.vue";
import VueTestUtils, { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueComposition from "@vue/composition-api";
import { expect } from "chai";

describe("LibraryItem.vue", () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(VueComposition);

    const component = (data?: any) => mount(LibraryItem, {
        stubs: {
            VMenu: "<div><slot></slot></div>"
        },
        ...data,
        vuetify: new Vuetify(),
        localVue
    });

    it("should show a image", () => {
        // get a sample image for the test
        const imageSrc = "./../../../../resources/wallpapers/images/sample-1.jpg";
        const wrapper = component({
            propsData: {
                wallpaper: {
                    path: imageSrc,
                    thumb: imageSrc,
                    title: "Title"
                }
            }
        });
        // get image component
        const image = wrapper.find(".library-item-thumb");

        // expec exist the component
        expect(image.exists()).to.be.equal(true);

        // expect the component have the corret src url
        expect(image.vm.$props.src).to.be.equal(imageSrc);
    });

    it("shoul show a icon if do not have a thumbnail image", () => {
        // get a sample image for the test
        const imageSrc = "./../../../../resources/wallpapers/images/sample-1.jpg";
        const wrapper = component({
            propsData: {
                wallpaper: {
                    path: imageSrc,
                    thumb: null,
                    title: "Title"
                }
            }
        });
        // get image component
        const image = wrapper.find(".library-item-thumb");

        // expect do not exist the image component
        expect(image.exists()).to.be.equal(false);

        // get icon component
        const icon = wrapper.find(".library-item-thumb-icon");

        // expect exist the icon component
        expect(icon.exists()).to.be.equal(true);
    });
    it("shoul when click in image emit a envent of click", async () => {
        // get a sample image for the test
        const imageSrc = "./../../../../resources/wallpapers/images/sample-1.jpg";
        const wrapper = component({
            propsData: {
                wallpaper: {
                    path: imageSrc,
                    thumb: imageSrc,
                    title: "Title"
                }
            }
        });
        // get image component
        const image = wrapper.find(".library-item-thumb");

        // trigger click event
        image.trigger("click");

        // await for the next tick
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("click").length).to.be.equal(1);
    });

    it("should when right click in card show menu options", async () => {
        // get a sample image for the test
        const imageSrc = "./../../../../resources/wallpapers/images/sample-1.jpg";
        const wrapper = component({
            propsData: {
                wallpaper: {
                    path: imageSrc,
                    thumb: imageSrc,
                    title: "Title"
                }
            }
        });
        // get image component
        const card = wrapper.find(".library-item-card");

        // trigger click event
        card.trigger("contextmenu");

        // await for the next tick
        await wrapper.vm.$nextTick();

        // expect show the menu
        expect(wrapper.vm.$data.state.menu.show).to.be.equal(true);
    });

    it("should when click in menu edit option emit event of edit", async () => {
        // get a sample image for the test
        const wallpaper = {
            path: "./../../../../resources/wallpapers/images/sample-1.jpg",
            thumb: "./../../../../resources/wallpapers/images/sample-1.jpg",
            title: "Title"
        };
        const wrapper = component({
            propsData: {
                wallpaper
            }
        });
        // get edit button component
        const editButton = wrapper.find(".library-item-edit-button");

        // trigger click event
        editButton.trigger("click");

        // await for the next tick
        await wrapper.vm.$nextTick();

        // expect event be emmited
        expect(wrapper.emitted("edit").length).to.be.equal(1);
        expect(wrapper.emitted("edit")[0][0]).to.be.equal(wallpaper);
    });
    it("should when click in menu delete option emit event of delete", async () => {
        // get a sample image for the test
        const wallpaper = {
            path: "./../../../../resources/wallpapers/images/sample-1.jpg",
            thumb: "./../../../../resources/wallpapers/images/sample-1.jpg",
            title: "Title"
        };
        const wrapper = component({
            propsData: {
                wallpaper
            }
        });
        // get delete button component
        const deleteButton = wrapper.find(".library-item-delete-button");

        // trigger click event
        deleteButton.trigger("click");

        // await for the next tick
        await wrapper.vm.$nextTick();

        // expect event be emmited
        expect(wrapper.emitted("delete").length).to.be.equal(1);
        expect(wrapper.emitted("delete")[0][0]).to.be.equal(wallpaper);
    });

});
