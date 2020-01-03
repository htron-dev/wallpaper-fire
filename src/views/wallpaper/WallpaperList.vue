<template>
  <v-navigation-drawer absolute
    right
    height="100%"
    permanent>

    <v-fab-transition>
        <v-btn
            v-show="!state.wallpaperDialog"
            dark
            fixed
            bottom
            right
            fab
            color="success"
            @click="state.wallpaperDialog = true"
        >
        <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-fab-transition>

    <v-dialog
        v-model="state.wallpaperDialog"
        max-width="1000"
    >
        <wallpaper-list-form @close="state.wallpaperDialog = false" />
    </v-dialog>

    <v-list>
        <v-list-item
            v-for="video in state.videos"
            :key="video.name"
            @click="setVideo(video.path)"
        >
            <v-list-item-avatar>
                <v-image
                    v-if="video.thumb"
                    :src="video.thumb" />
                    <v-icon
                        v-else
                        x-large
                    >
                        mdi-image
                    </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ video.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ new Date().toLocaleString() }}</v-list-item-subtitle>
                <v-list-item-subtitle class="caption">{{ video.path }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { createComponent, computed, reactive } from "@vue/composition-api";

export default createComponent({
    components: {
        WallpaperListForm: () => import("./WallpaperListForm")
    },
    setup (props, { root }) {
        root.$store.dispatch("setWallpapers");
        const state = reactive({
            videos: computed(() => root.$store.state.videos.all),
            wallpaperDialog: false
        });

        const setVideo = (filename) => {
            root.$store.dispatch("setCurrentVideo", filename);
        };

        return {
            state,
            setVideo
        };
    }
});
</script>

<style>

</style>
