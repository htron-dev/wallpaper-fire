<template>
    <v-form @submit.prevent="submit">
        <v-card>
            <v-card-text>
                <div
                    v-if="!state.filePath"
                    class="text-center">
                    <v-btn @click="setFile">select file</v-btn>
                </div>
                <v-row>
                    <v-col
                        cols="12"
                        md="4">
                        <video
                            width="100%"
                            height="100%"
                            controls
                            :src="'file://' + state.filePath"></video>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Title"
                            v-model="state.title"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    :disabled="state.filePath === ''"
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

export default createComponent({
    setup (props, { emit }) {
        const state = reactive({
            filePath: "",
            videoBuffer: Buffer,
            title: "",
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

            const read = await fs.readFileSync(file.filePaths[0]);
            state.videoBuffer = read;

            console.log(file);

            state.filePath = file.filePaths[0];

        };

        const submit = () => {
            console.log(state.filePath);
        };

        return {
            setFile,
            submit,
            state
        };
    }
});
</script>
