<template>
    <v-row v-if="wallpaper" no-gutters>
        <v-col cols="12">
            <video
                id="wallpaper-preview-video"
                controls
                :src="'file://' + wallpaper.path"
                max-width="100%" max-height="100%" />
        </v-col>
        <v-col
            cols="12"
            class="my-3"
        >
            <h1 class="title">{{ $lodash.capitalize(wallpaper.title) }}</h1>
            <h2
                v-if="wallpaper.description"
                class="subtitle-1"
            >
                {{ wallpaper.description }}
            </h2>
        </v-col>
        <v-col>
            <v-btn
                class="mr-4"
                @click="setWallpaper"
                color="success">Use wallpaper</v-btn>
            <v-btn
                class="mr-4"
                @click="$emit('edit-wallpaper', wallpaper)"
                color="info">
                Edit
            </v-btn>
            <v-btn
                @click="$emit('delete-wallpaper', wallpaper)"
                color="error">
                Delete
            </v-btn>
        </v-col>
    </v-row>
    <v-row v-else no-gutters>
        <v-col cols="12">
            <v-icon
                id="wallpaper-preview-video"
                class="grey"
                size='150'
            >
                mdi-youtube
            </v-icon>
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
        };

        return {
            setWallpaper
        };
    }
});
</script>

<style>
    #wallpaper-preview-video{
        width: 100%;
        min-height: 400px;
    }
</style>
