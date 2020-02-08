<template>
    <v-card flat class="fill-height">
        <v-card-title>
            {{playlist.title}}
            <v-spacer />
            <v-btn
                v-if="!state.haveActivePlaylist"
                class="mr-4"
                color="success"
                @click="usePlaylist"
            >
                use playlist
            </v-btn>
            <v-btn
                v-else
                class="mr-4"
                color="warning"
                @click="stopCurrentPlaylist"
            >
                stop current playlist
            </v-btn>
            <v-menu
                v-model="state.menu"
                min-width="350px"
                offset-y
            >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list class="py-0">
                    <v-list-item @click="$emit('update')">
                        <v-list-item-content>
                            Edit Playlist
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        :input-value="true"
                        class="error white--text"
                        @click="state.alertDialog = true"
                    >
                        <v-list-item-content>
                            Delete Playlist
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-card-subtitle v-if="playlist.description">
            {{playlist.description}}
        </v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                </v-col>
                <v-col cols="12">
                    <w-wallpaper-list
                        v-model="state.selected"
                        show-select
                        :loading="state.loading"
                        :wallpapers="state.wallpapers" />
                </v-col>
            </v-row>
        </v-card-text>
        <v-dialog
            max-width="450px"
            v-model="state.alertDialog">
            <v-card >
                <v-card-text class="text-center">
                    <v-icon
                        size="200"
                        color="warning"
                    >
                        mdi-alert
                    </v-icon>
                    <h3> Are you sure </h3>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="success"
                        @click="deletePlaylist"
                    >
                        Yes
                    </v-btn>
                    <v-btn
                        color="error"
                        @click="state.alertDialog = false"
                    >
                        No
                    </v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";
import { useStore } from "../../store/use-store";

export default createComponent({
    props: {
        playlist: {
            type: Object,
            required: true
        }
    },
    setup (props, { emit }) {
        const state = reactive<any>({
            wallpapers: [],
            selected: [],
            loading: true,
            menu: false,
            alertDialog: false,
            haveActivePlaylist: computed<Boolean>(() => {
                if (store.state.playlist.timer !== null) {
                    return true;
                }
                return false;
            })
        });

        const store = useStore();
        const load = () => {
            state.wallpapers = store.getters["wallpaper/getAll"];
            setTimeout(() => {
                state.loading = false;
            }, 800);
        };
        const usePlaylist = () => {
            store.dispatch("playlist/setPlaylist", state.selected);
        };
        const stopCurrentPlaylist = () => {
            store.dispatch("playlist/stopPlaylist");
        };

        const updatePlaylist = () => {
            store.dispatch("playlist/update", props.playlist.id);
        };
        const deletePlaylist = () => {
            store.dispatch("playlist/delete", props.playlist.id);
            state.alertDialog = false;
            emit("close");
        };

        load();

        return {
            state,
            usePlaylist,
            deletePlaylist
        };
    }
});
</script>
