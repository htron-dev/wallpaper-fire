<template>
    <v-row v-if="wallpaper">
        <v-col cols="12">
            <video
                id="wallpaper-preview-video"
                controls
                :src="'file://' + wallpaper.path"
                max-width="100%" max-height="100%" />
        </v-col>
        <v-col cols="12">
            <h1 class="title">{{ wallpaper.title }}</h1>
            <h2
                v-if="wallpaper.description"
                class="subtitle-1"
            >
                {{ wallpaper.description }}
            </h2>
        </v-col>
        <v-col>
            <v-btn
                @click="setWallpaper"
                large color="success">Set as wallpaper</v-btn>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col>
            Choose a video
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import { useStore } from "@/store/use-store";

export default createComponent({
    props: {
        wallpaper: {
            type: Object,
            required: false,
            default: null
        }
    },
    setup (props) {
        const store = useStore();

        const setWallpaper = () => {
            store.dispatch("setDescktopWallpaper", props.wallpaper);
        }

        return {
            setWallpaper
        };
    }
});
</script>

<style>
    #wallpaper-preview-video{
        width: 100%;
        height: 670px;
    }
</style>
