<template>
    <div>
        <v-form
            ref="form"
            @submit.prevent="submit">
            <v-card v-show="state.path">
                <v-card-text>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                            lg="5"
                        >
                            <w-thumbnail-picker
                                v-if="state.path"
                                v-model="state.thumb"
                                :path="state.path" />
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
                        class="library-form-close-button"
                        @click="close"
                        color="error">cancel</v-btn>
                    <v-btn
                        class="library-form-submit-button"
                        color="success"
                        type="submit">save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
import { createComponent, reactive, watch, ref, onMounted } from "@vue/composition-api";
import { getFile } from "./functions";
import { useStore } from "@/store";

export default createComponent({
    props: {
        editedItem: {
            type: Object,
            require: false,
            default: null
        }
    },
    setup (props, { emit }) {
        const store = useStore();

        const state = reactive<any>({
            path: null,
            title: null,
            description: null,
            extname: null,
            thumb: null
        });

        const form = ref<any>(null);

        const close = () => {
            emit("close");
        };

        const setFile = async () => {
            try {
                const options = {
                    properties: ["openFile", "multiSelections"]
                };
                const filePath = await getFile(options);
                state.path = filePath;
                state.extname = filePath.split(".").pop();
                state.title = filePath.replace(`.${state.extname}`, "").split("/").pop();
            } catch (error) {
                store.dispatch("showErrorNotification", error);
                close();
            }
        };

        /**
         *  Initial function
         */
        const load = async () => {
            if (props.editedItem) {
                const wallpaper = JSON.parse(JSON.stringify(props.editedItem));
                state.path = wallpaper.path;
                state.title = wallpaper.title;
                state.extname = wallpaper.extname;
                // set description if edited-item have description
                if (state.description) {
                    state.description = wallpaper.description;
                }
                // set thumb edited-item have thumbnail
                if (wallpaper.thumb) {
                    state.thumb = wallpaper.thumb;
                }
            } else {
                await setFile();
            }
        };

        onMounted(load);

        const submit = async () => {
            try {
                if (!form.value) {
                    return;
                }
                if (!form.value.validate()) {
                    return;
                }
                const wallpaper = {
                    path: state.path,
                    title: state.title,
                    description: state.description,
                    extname: state.extname,
                    thumb: state.thumb
                };

                if (props.editedItem) {
                    await store.dispatch("wallpaper/edit", {
                        id: props.editedItem.id,
                        wallpaper: wallpaper
                    });
                } else {
                    await store.dispatch("wallpaper/create", wallpaper);
                }

                await store.dispatch("wallpaper/setWallpapers");
                emit("submit");
                close();
            } catch (error) {
                throw new Error(error);
            }
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
