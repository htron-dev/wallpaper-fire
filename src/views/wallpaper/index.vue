<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <v-card height="100%">
                <v-card-text class="fill-height">
                    <v-row  class="fill-height">
                        <v-col>
                            <wallpaper-preview :wallpaper="state.wallpaper" />
                        </v-col>
                        <v-col cols="12" md="4">
                            <WallpaperList
                                @select-wallpaper="(wallpaper) => state.wallpaper = wallpaper" />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";

type WallpaperState = {
  wallpaper: null | any
}

export default createComponent({
    components: {
        WallpaperList: () => import("./WallpaperList"),
        WallpaperPreview: () => import("./WallpaperPreview")
    },
    setup () {
        const state = reactive<WallpaperState>({
            wallpaper: null,
        });
        return {
            state
        };
    }
});
</script>

<style>

</style>
