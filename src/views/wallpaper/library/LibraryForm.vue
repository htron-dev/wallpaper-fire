<template>
    <v-form
        ref="form"
        @submit.prevent="submit">
        <v-card>
            <v-card-text>
                <div
                    v-if="!state.path"
                    class="text-center my-8">
                    <v-btn
                        color="blue"
                        class="white--text"
                        @click="setFile">
                        select file
                        <v-icon class="pl-3">mdi-file</v-icon>
                    </v-btn>
                </div>
                <v-row v-else>
                    <v-col
                        cols="12"
                        md="4">
                        <v-slider
                            v-model="state.slide"
                            label="Choose thumbnail"
                            max="100"
                            min="1"
                        />
                        <v-img :src="state.thumb" />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="state.title"
                            :rules="[v => !!v || 'Required field']"
                            label="Title"
                        />
                        <v-textarea
                            @keyup.ctrl.enter="submit"
                            label="Description"
                            v-model="state.description" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    @click="close"
                    color="error">cancel</v-btn>
                <v-btn
                    :disabled="state.path === ''"
                    color="success"
                    type="submit">save</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import { createComponent, reactive, watch, ref } from "@vue/composition-api";

const { dialog } = window.require("electron").remote;
const fs = window.require("fs");
const path = window.require("path");

export default createComponent({
    props: {
        editedItem: {
            type: Object,
            require: false,
            default: null
        }
    },
    setup (props, { emit, root }) {
        const state = reactive({
            slide: 1,
            path: "",
            title: "",
            description: "",
            extname: "",
            thumb: ""
        });

        const form = ref(null);

        const video = document.createElement("video");

        const close = () => {
            emit("close");
        };

        watch(() => state.slide, (old, newSlide) => {
            if (video && video.duration && video.duration !== Infinity) {
                video.currentTime = Math.ceil((newSlide / 100) * video.duration);
            }
        });

        const setFile = async () => {
            const options = {
                properties: ["openFile", "multiSelections"]
            };

            const file = await dialog.showOpenDialog(options);

            if (file.canceld || file.filePaths.length === 0) {
                root.$store.dispatch("showErrorNotification", "Canceled");
                close();
                return;
            }
            state.extname = path.extname(file.filePaths[0]);
            state.title = path.basename(file.filePaths[0]).replace(state.extname, "");

            state.path = file.filePaths[0];

            setVideoPreview();
        };

        const setVideoPreview = () => {
            video.setAttribute("src", `file://${state.path}`);
            video.setAttribute("type", `video/${state.extname.replace(".", "")}`);

            video.addEventListener("timeupdate", () => {
                if (video.duration === Infinity) {
                }
            });

            video.addEventListener("loadedmetadata", () => {
                if (video.duration === Infinity) {
                    video.currentTime = 999999999;
                } else {
                    video.currentTime = Math.ceil(0.5 * video.duration);
                }
            });

            video.addEventListener("seeked", () => {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext("2d");

                canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

                canvas.toBlob(blob => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const base64 = reader.result;
                        state.thumb = base64;
                    };
                });
            });
        };

        if (props.editedItem) {
            const wallpaper = JSON.parse(JSON.stringify(props.editedItem));
            state.path = wallpaper.path;
            state.title = wallpaper.title;
            state.title = wallpaper.title;
            state.description = wallpaper.description;
            state.description = wallpaper.description;
            if (wallpaper.thumb) {
                state.thumb = `file://${wallpaper.thumb}`;
            }
            setVideoPreview();
        }

        const submit = async () => {
            if (!form.value.validate()) {
                return;
            }
            const wallpaper = {
                path: state.path,
                title: state.title,
                description: state.description,
                extname: state.extname,
                timestamp: Date.now(),
                thumb: state.thumb
            };

            if (props.editedItem) {
                await root.$store.dispatch("wallpaper/edit", {
                    id: props.editedItem.id,
                    wallpaper: wallpaper
                });
            } else {
                await root.$store.dispatch("wallpaper/create", wallpaper);
            }
            root.$store.dispatch("wallpaper/setAll");
            close();
        };

        return {
            form,
            setFile,
            submit,
            state,
            close
        };
    }
});
</script>
