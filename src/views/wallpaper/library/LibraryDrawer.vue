<template>
    <v-navigation-drawer
        fixed
        right
        width="600px"
        temporary
        v-model="state.model">
        <v-card flat>
            <v-card-text>
                <video
                    id="wallpaper-preview-video"
                    controls
                    :src="'file://' + wallpaper.path"
                    max-width="100%" max-height="100%" />
                <h1 class="title">{{ $lodash.capitalize(wallpaper.title) }}</h1>
                <h2
                    v-if="wallpaper.description"
                    class="subtitle-1"
                >
                    {{ wallpaper.description }}
                </h2>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="mt-4">
                <div style="width:100%">
                    <v-btn
                        class="mb-3"
                        @click="setWallpaper"
                        block
                        color="success">Use wallpaper</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";
import { useStore } from "@/store/use-store";

export default createComponent({
    name: "LibraryDrawer",
    props: {
        value: {
            type: Boolean,
            required: false,
            default: false
        },
        wallpaper: {
            type: Object,
            required: false,
            default: null
        }
    },
    setup (props, { emit }) {
        const store = useStore();

        const state = reactive({
            model: computed<boolean>({
                get () {
                    return props.value;
                },
                set (value) {
                    emit("input", value);
                }
            })
        });

        const setWallpaper = () => {
            store.dispatch("setDescktopWallpaper", props.wallpaper);
        };

        return {
            state,
            setWallpaper
        };
    }
});
</script>

<style>
    #wallpaper-preview-video{
        width: 100%;
        min-height: 400px;
        max-height: 100%;
    }
</style>
