<template>
    <v-form
        @submit.prevent="submit">
        <v-card>
            <v-card-text>
                <div
                    v-if="!state.path"
                    class="text-center">
                    <v-btn @click="setFile">select file</v-btn>
                </div>
                <v-row v-else>
                    <v-col
                        cols="12"
                        md="4">
                        <video
                            width="100%"
                            height="100%"
                            controls
                            :src="'file://' + state.path"></video>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Title"
                            v-model="state.title" />
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
import { createComponent, reactive } from "@vue/composition-api";

const { dialog } = window.require("electron").remote;
const fs = window.require("fs");
const path = window.require("path");

export default createComponent({
    setup (props, { emit, root }) {
        const state = reactive({
            path: "",
            title: "",
            description: "",
            extname: "",
            thumb: ""

        });

        const close = () => {
            emit("close");
        };

        const setFile = async () => {
            const options = {
                properties: ["openFile", "multiSelections"]
            };

            const file = await dialog.showOpenDialog(options);

            if (file.canceld || file.filePaths.length === 0) {
                alert("error");
                close();
                return;
            }
            state.extname = path.extname(file.filePaths[0]);
            state.title = path.basename(file.filePaths[0]).replace(state.extname, "");

            state.path = file.filePaths[0];
        };

        const submit = () => {
            const wallpaper = {
                path: state.path,
                title: state.title,
                description: state.description,
                extname: state.extname,
                timestamp: Date.now(),
                thumb: state.thumb
            };

            root.$store.dispatch("addWallpaper", wallpaper);
            close();
        };

        return {
            setFile,
            submit,
            state,
            close
        };
    }
});
</script>
