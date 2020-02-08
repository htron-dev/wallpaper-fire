<template>
    <v-form
        ref="form"
        @submit.prevent="submit">
        <v-card>
            <v-card-title class="blue white--text font-weight-bold">
                <h2 class="title">{{state.labels.formTitle}}</h2>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="Title"
                            :rules="[state.rules.required]"
                            v-model="state.playlist.title" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Description"
                            v-model="state.playlist.description" />
                    </v-col>
                    <v-col cols="12">
                        <w-time-picker
                            v-model="state.playlist.config.delay"
                            return-miliseconds
                            :rules="[state.rules.required]"
                            label="Wallpapers Interval" />
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            label="Wallpapers"
                            :items="state.wallpapers"
                            item-text="title"
                            item-value="id"
                            chips
                            :rules="[state.rules.required, state.rules.selectOne]"
                            v-model="state.playlist.wallpaperIds"
                            multiple
                            hide-selected
                        >
                            <template v-slot:selection="data">
                                <v-chip
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    close
                                    @click="data.select"
                                    @click:close="removeItem(data.item)"
                                >
                                    <v-avatar left>
                                        <v-img
                                            v-if="data.item.thumb"
                                            :src="'file://' + data.item.thumb">
                                        </v-img>
                                        <v-icon v-else>
                                            mdi-play
                                        </v-icon>
                                    </v-avatar>
                                    {{ data.item.title }}
                                </v-chip>
                            </template>
                            <template v-slot:item="data">
                                <template v-if="typeof data.item !== 'object'">
                                    <v-list-item-content v-text="data.item"></v-list-item-content>
                                </template>
                                <template v-else>
                                    <v-list-item-avatar>
                                        <v-img
                                            v-if="data.item.thumb"
                                            :src="'file://' + data.item.thumb">
                                        </v-img>
                                        <v-icon v-else>
                                            mdi-play
                                        </v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="data.item.title"></v-list-item-title>
                                        <v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    color="error"
                    large
                    @click="$emit('close')">
                    Cancel
                </v-btn>
                <v-btn
                    color="success"
                    large
                    type="submit">
                    {{state.labels.submitButton}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
import { createComponent, reactive, ref, computed, watch } from "@vue/composition-api";
import { useStore } from "@/store/use-store";
import state, { PlayList } from "../../store/modules/playlist/state";

export default createComponent({
    props: {
        editedItemId: {
            type: [Number, String],
            required: false,
            default: null
        }
    },
    setup (props, { emit }) {
        // get store
        const store = useStore();

        const state = reactive<any>({
            playlist: {
                wallpaperIds: [],
                config: {
                    delay: null
                }
            },
            wallpapers: [],
            labels: computed(() => {
                const labels = {
                    formTitle: "Create playlist",
                    submitButton: "Create"
                };
                if (props.editedItemId) {
                    labels.formTitle = "Edit playlist";
                    labels.submitButton = "Save";
                }

                return labels;
            }),
            rules: {
                required: (v: any) => !!v || "Required field",
                selectOne: (value: any[]) => {
                    let valid = true;
                    if (value && value.length === 0) {
                        valid = false;
                    }
                    return valid || "Choose at least one";
                }
            }
        });
        // ref form
        const form = ref<any>(null);
        const load = async () => {
            if (props.editedItemId) {
                const playlist = await store.dispatch("playlist/getById", props.editedItemId);
                state.playlist = playlist;
            }
            // get the list of all wallpaperss
            state.wallpapers = store.getters["wallpaper/getAll"];
        };

        watch(() => props.editedItemId, () => {
            state.playlist = {
                wallpaperIds: [],
                config: {
                    delay: null
                }
            };
            if (form.value) {
                form.value.resetValidation();
                load();
            }
        });

        // function to create a playes
        const submit = async () => {
            if (!form.value.validate()) {
                return;
            }

            if (props.editedItemId) {
                const data = {
                    id: props.editedItemId,
                    playlist: state.playlist
                };

                store.dispatch("playlist/update", data);
            } else {
                store.dispatch("playlist/create", state.playlist);
            }
            emit("close");
        };
        const removeItem = (item: Partial<PlayList>) => {
            const index = state.wallpapers.indexOf(item);
            state.playlist.wallpaperIds.splice(index, 1);
        };

        load();
        return {
            state,
            form,
            removeItem,
            submit
        };
    }
});
</script>
