<template>
    <v-form
        ref="form"
        @submit.prevent="createPlaylist">
        <v-card>
            <v-card-title class="blue white--text font-weight-bold">
                <h2 class="title">Add a new playlist</h2>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="Title"
                            :rules="[rules.required]"
                            v-model="playlist.title" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Description"
                            v-model="playlist.description" />
                    </v-col>
                    <v-col cols="12">
                        <w-time-picker
                            v-model="playlist.config.delay"
                            return-miliseconds
                            :rules="[rules.required]"
                            label="Wallpapers Interval" />
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                            label="Wallpapers"
                            :items="wallpapers"
                            item-text="title"
                            item-value="id"
                            chips
                            :rules="[rules.required, rules.selectOne]"
                            v-model="playlist.wallpaperIds"
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
                                            :src="data.item.thumb">
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
                                            :src="data.item.thumb">
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
                    Create playlist
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
import { createComponent, reactive, ref } from "@vue/composition-api";
import { useStore } from "@/store/use-store";
import { PlayList } from "../../store/modules/playlist/state";

export default createComponent({
    setup (props, { emit }) {
        // get store
        const store = useStore();

        // v-model
        const playlist = reactive({
            wallpaperIds: [],
            config: {
                delay: null
            }
        });
        // ref form
        const form = ref<any>(null);

        // rules
        const rules = {
            required: (v: any) => !!v || "Required field",
            selectOne: (value: any[]) => {
                let valid = true;
                if (value && value.length === 0) {
                    valid = false;
                }
                return valid || "Choose at least one";
            }
        };

        // get the list of all wallpaperss
        const wallpapers = store.getters["wallpaper/getAll"];

        // function to create a playes
        const createPlaylist = () => {
            if (!form.value.validate()) {
                return;
            }
            store.getters["playlist/create"](playlist);
            emit("close");
        };
        const removeItem = (item: Partial<PlayList>) => {
            const index = wallpapers.indexOf(item);
            playlist.wallpaperIds.splice(index, 1);
        };
        return {
            playlist,
            wallpapers,
            rules,
            form,
            removeItem,
            createPlaylist
        };
    }
});
</script>
