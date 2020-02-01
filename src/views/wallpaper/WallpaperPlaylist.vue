<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <v-card height="100%">
                <v-card-title>
                    <v-btn
                        color="info"
                        class="mr-5"
                        @click="state.createDialog = true"
                    >
                        Create Playlist
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row style="min-height: 80vh;">
                        <v-col cols="12" md='5'>
                            <v-list>
                                <v-list-item
                                    @click="showPlaylist(playlist)"
                                    :key="playlist.id"
                                    v-for="playlist in state.playlists">
                                    <v-list-item-avatar>
                                        <v-img v-if="playlist.thumb" :src="playlist.thumb" />
                                        <v-icon v-else size="50px">mdi-image</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="playlist.title" />
                                        <v-list-item-subtitle v-text="playlist.description" />
                                    </v-list-item-content>
                                    <v-list-item-content>
                                        Wallpapers: {{ playlist.wallpaperIds.length }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col v-if="state.selected && state.edit">
                            <div
                                class="text-right">
                                <v-btn
                                    class="mr-4"
                                    color="error"
                                    @click="reset"
                                >
                                    Discart changes
                                </v-btn>
                                <v-btn
                                    @click="savePlaylist"
                                    color="success">
                                    Save Playlist
                                </v-btn>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="state.editedItem.title"
                                            label="Title"
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="state.editedItem.description"
                                            label="Description"
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <w-time-picker
                                            v-model="state.editedItem.config.delay"
                                            return-miliseconds
                                            prepend-icon="mdi-clock-outline"
                                            label="Interval" />                                        
                                    </v-col>
                                </v-row>
                            </div>
                            <w-wallpaper-list
                                v-if="state.playlistWallpapers"
                                :hide-actions="state.edit"
                                :wallpapers="state.playlistWallpapers"
                            />
                        </v-col>
                        <v-col v-else-if="state.selected">
                            <div class="text-right">
                                <v-btn
                                    class="mr-4 white--text"
                                    color="blue"
                                    @click="state.edit = true"
                                >
                                    Edit
                                </v-btn>
                                <v-btn
                                    color="warning"
                                    v-if="state.haveActivePlaylist"
                                    @click="stopPlaylist"
                                >
                                    Stop current Playlist
                                </v-btn>
                                <v-btn
                                    v-else
                                    @click="setPlaylist"
                                    color="success">Use Playlist
                                </v-btn>
                            </div>
                            <div class="pl-4 mb-4">
                                <h2 class="title d-block">{{ state.selected.title }}</h2>
                                <h3 class="subtitle  d-block">{{ state.selected.description }}</h3>
                            </div>
                            <w-wallpaper-list
                                v-if="state.playlistWallpapers"
                                :hide-actions="state.edit"
                                :wallpapers="state.playlistWallpapers"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-dialog
                max-width="1200" v-model="state.createDialog"
                v-if="state.createDialog"
            >
                <wallpaper-playlist-form
                    @close="state.createDialog = false"
                />
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";
import { useStore } from "@/store/use-store";
import { PlayList } from "@/store/modules/playlist/state";
import { Wallpaper } from "../../store/modules/wallpaper/state";

type State = {
    selected: null | any;
    [prop: string]: any;
};

export default createComponent({
    components: {
        WallpaperPlaylistForm: () => import("./WallpaperPlaylistForm.vue")
    },
    setup () {
        const store = useStore();
        const state = reactive<State>({
            edit: false,
            createDialog: false,
            playlists: [],
            selected: null,
            playlistWallpapers: null,
            editedItem: {
                config: {
                    delay: 0
                }
            },
            haveActivePlaylist: computed<Boolean>(() => {
                if (store.state.playlist.timer !== null) {
                    return true;
                }
                return false;
            })
        });

        const setupPlalists = () => {
            state.playlists = store.getters["playlist/getAll"];
            if (!state.selected && state.playlists.length > 1) {
                showPlaylist(state.playlists[0]);
            }
        };

        const showPlaylist = (item: PlayList) => {
            const plalist = JSON.parse(JSON.stringify(item));
            const filter = {
                ids: item.wallpaperIds
            };
            const wallpapers = store.getters["wallpaper/find"](filter);
            state.selected = plalist;
            state.editedItem = plalist;
            state.playlistWallpapers = wallpapers;
        };

        const reset = () => {
            if (state.selected) {
                const plalist = JSON.parse(JSON.stringify(state.selected));
                state.editedItem = plalist;
            }
            state.edit = false;
        };

        const savePlaylist = () => {
            if (!state.selected) {
                return;
            }
            const id = state.selected.id;
            const playlist = JSON.parse(JSON.stringify(state.editedItem));
            store.getters["playlist/update"](id, playlist);
            state.edit = false;
            setupPlalists();
        };

        const setPlaylist = () => {
            store.dispatch("playlist/setPlaylist", state.selected);
        };

        const stopPlaylist = () => {
            store.commit("playlist/CLEAR_TIMER");
        };

        setupPlalists();
        return {
            state,
            showPlaylist,
            reset,
            savePlaylist,
            setPlaylist,
            stopPlaylist
        };
    }
});
</script>

<style>

</style>
