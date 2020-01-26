<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <v-card height="100%">
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
                                        Wallpapers: {{ playlist.wallpapersIds.length }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col>
                            <div class="text-right">
                                <v-btn class="mr-4" color="error">Discart changes</v-btn>
                                <v-btn color="success">Save Playlist</v-btn>
                            </div>
                            <w-time-picker
                                v-model="state.editedItem.config.delay"
                                :items="times"
                                prepend-icon="mdi-clock-outline"
                                label="Delay of changes" />

                            <v-list>
                                {{ state.selected }}
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import { useStore } from "@/store/use-store";
import { PlayList } from "@/store/modules/playlist/state";
type WallpaperPlaylistState = {
    playlists: null | PlayList[],
    selected: null | PlayList,
    editedItem: any
}
export default createComponent({
    setup () {
        const state = reactive<WallpaperPlaylistState>({
            playlists: [],
            selected: null,
            editedItem: {
                config: {
                    delay: "00:00"
                }
            }
        });
        const store = useStore();
        const setPlalists = () => {
            state.playlists = [
                {
                    id: 1,
                    title: "Titulo",
                    description: "description",
                    thumb: null,
                    wallpapersIds: [1],
                    config: {
                        delay: 5000
                    }
                }
            ];
            // state.plalists = store.getters["playlist/getAll"];
        };

        const showPlaylist = (plalist: PlayList) => {
            state.selected = plalist;
        };

        const times = [
            "00:05",
            "00:10",
            "00:15",
            "00:20",
            "00:25",
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "1 day",
            "2 days",
            "3 days",
            "5 days",
            "10 days"

        ];

        setPlalists();
        return {
            state,
            times,
            showPlaylist
        };
    }
});
</script>

<style>

</style>
