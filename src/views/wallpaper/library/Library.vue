<template>
    <v-row align="start">
        <template
            v-for="wallpaper in state.wallpapers">
            <v-col
                cols="3"
                md="3"
                lg="2"
                :key="wallpaper.id">
                <library-item :wallpaper="wallpaper" />
            </v-col>
        </template>
        <v-dialog v-model="state.dialog" max-width="1000">
            <library-form
                @close="state.dialog = false" />
        </v-dialog>
        <v-fab-transition>
            <v-btn
                v-show="!state.dialog"
                dark
                fixed
                bottom
                right
                fab
                color="success"
                @click="state.dialog = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-row>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";
import { useStore } from "../../../store/use-store";
import { Wallpaper } from "../../../store/modules/wallpaper/state";

export default createComponent({
    components: {
        LibraryItem: () => import("./LibraryItem.vue"),
        LibraryForm: () => import("./LibraryForm.vue")
    },
    setup () {
        const store = useStore();
        const state = reactive({
            dialog: false,
            wallpapers: computed<Wallpaper[]>(() => store.state.wallpaper.wallpapers)
        });

        if (state.wallpapers.length === 0) {
            store.dispatch("wallpaper/setWallpapers");
        }

        return {
            state
        };
    }
});
</script>
