<template>
    <v-toolbar
        class="wallpaper-toolbar"
        color="blue  lighten-1"
        height="85px">
        <v-toolbar-items >
            <v-btn
                v-for="item in items"
                :key="item.text"
                :to="item.to"
                min-width="300"
                depressed
                exact
                exact-active-class="blue darken-2"
                dark
                color="transparent">
                <span class="text-center">
                    <v-icon class="d-block mb-2" dark>{{ item.icon }}</v-icon>
                    {{item.text}}
                </span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { createComponent } from "@vue/composition-api";
export default createComponent({
    setup () {
        const items = [
            {
                text: "Library",
                icon: "mdi-youtube",
                to: { name: "library" }
            },
            {
                text: "Playlists",
                icon: "mdi-library-video",
                to: { name: "wallpaper-playlist" }
            }
        ];
        return {
            items
        };
    }
});
</script>

<style scoped>
    .wallpaper-toolbar .v-toolbar__content {
        padding-left: 0;
    }
</style>
