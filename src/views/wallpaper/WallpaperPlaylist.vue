<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <v-card height="100%">
                <v-card-title>
                    <v-btn
                        color="info"
                        class="mr-5"
                        @click="state.playlistDialog = true"
                    >
                        Create Playlist
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row style="min-height: 80vh;">
                        <v-col cols="12" lg='6'>
                            <v-list>
                                <v-list-item
                                    @click="showPlaylist(playlist)"
                                    :key="playlist.id"
                                    v-for="playlist in state.playlists">
                                    <v-list-item-avatar :tile="!playlist.thumb">
                                        <v-img v-if="playlist.thumb" :src="'file://' + playlist.thumb" />
                                        <v-icon v-else large>mdi-image-multiple</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="playlist.title" />
                                        <v-list-item-subtitle v-text="playlist.description" />
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col>
                            <wallpaper-playlist-view
                                v-if="state.selected"
                                :playlistId="state.selected.id"
                                @update="editPlaylist"
                                @close="reset"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-dialog
                v-model="state.playlistDialog"
                max-width="1200"
            >
                <wallpaper-playlist-form
                    :edited-item-id='state.editedItemId'
                    @close="reset"
                />
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { createComponent, reactive, watch } from "@vue/composition-api";
import { PlayList, useStore } from "@/store";

type State = {
    selected: null | any;
    [prop: string]: any;
};

export default createComponent({
    components: {
        WallpaperPlaylistForm: () => import("./WallpaperPlaylistForm.vue"),
        WallpaperPlaylistView: () => import("./WallpaperPlaylistView.vue")
    },
    setup () {
        const store = useStore();
        const state = reactive<State>({
            edit: false,
            playlistDialog: false,
            playlists: [],
            selected: null,
            editedItemId: null
        });

        watch(() => state.playlistDialog, (value) => {
            if (!value) {
                state.editedItemId = null;
            }
        });

        const load = () => {
            state.playlists = store.getters["playlist/getAll"];
        };

        const showPlaylist = (item: PlayList) => {
            const plalist = JSON.parse(JSON.stringify(item));
            state.selected = plalist;
        };

        const reset = () => {
            state.selected = null;
            state.playlistDialog = false;
            state.playlists = [];
            load();
        };

        const editPlaylist = () => {
            state.editedItemId = state.selected.id;
            state.playlistDialog = true;
        };

        load();
        return {
            state,
            showPlaylist,
            editPlaylist,
            reset
        };
    }
});
</script>

<style>

</style>
