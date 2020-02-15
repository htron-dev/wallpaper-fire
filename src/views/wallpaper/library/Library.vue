<template>
    <v-row align="start">
        <template
            v-for="wallpaper in state.wallpapers">
            <v-col
                cols="3"
                md="3"
                lg="2"
                :key="wallpaper.id">
                <library-item
                    :wallpaper="wallpaper"
                    @click="selectWallpaper(wallpaper)"
                    @edit="editWallpaper"
                    @delete="handleDeleteWallpaper"
                />
            </v-col>
        </template>

        <library-drawer
            v-if="state.selected"
            v-model="state.drawer"
            :wallpaper="state.selected"
        />

        <v-dialog v-model="state.dialog" max-width="1000">
            <library-form
                v-if="state.dialog"
                :edited-item="state.editedItem"
                @close="state.dialog = false" />
        </v-dialog>
        <w-alert
            v-model="state.alert"
            @positive="deleteWallpaper"
            @negative="state.editedItem = null"
        />
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
import { createComponent, reactive, computed, watch } from "@vue/composition-api";
import { useStore } from "../../../store/use-store";
import { Wallpaper } from "../../../store/modules/wallpaper/state";

export default createComponent({
    components: {
        LibraryItem: () => import("./LibraryItem.vue"),
        LibraryForm: () => import("./LibraryForm.vue"),
        LibraryDrawer: () => import("./LibraryDrawer.vue")
    },
    setup () {
        const store = useStore();
        const state = reactive<any>({
            alert: false,
            dialog: false,
            drawer: false,
            selected: null,
            editedItem: null,
            wallpapers: computed<Wallpaper[]>(() => store.state.wallpaper.wallpapers)
        });

        watch(() => state.dialog, (value) => {
            if (!value) {
                state.editedItem = null;
            }
        });

        if (state.wallpapers.length === 0) {
            store.dispatch("wallpaper/setWallpapers");
        }

        const selectWallpaper = (wallpaper: Wallpaper) => {
            state.selected = wallpaper;
            state.drawer = true;
        };

        const editWallpaper = (wallpaper: Wallpaper) => {
            state.editedItem = wallpaper;
            state.dialog = true;
        };

        const handleDeleteWallpaper = (wallpaper: Wallpaper) => {
            state.editedItem = wallpaper;
            state.alert = true;
        };
        const deleteWallpaper = (wallpaper: Wallpaper) => {
            store.dispatch("wallpaper/delete", state.editedItem.id);
            state.editedItem = null;
        };

        return {
            state,
            selectWallpaper,
            editWallpaper,
            deleteWallpaper,
            handleDeleteWallpaper
        };
    }
});
</script>
