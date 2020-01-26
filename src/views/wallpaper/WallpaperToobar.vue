<template>
    <v-toolbar class='pl-0' height="80px">
        <v-toolbar-items>
            <v-btn
                v-for="item in items"
                :key='item.text'
                :to="item.to"
                exact
                text
                color='blue'>
                <span class="text-center">
                    <v-icon class="d-block mb-1" dark>{{ item.icon }}</v-icon>
                    {{item.text}}
                </span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { createComponent, reactive } from "@vue/composition-api";
export default createComponent({
    setup () {
        const items = [
            {
                text: "All videos",
                icon: "mdi-youtube",
                to: { name: "wallpaper-all" }
            },
            {
                text: "Playlists",
                icon: "mdi-library-video",
                to: { name: "wallpaper-playlist" }
            }
        ];
        return {
            items
        }
    }
});
</script>

<style>

</style>
