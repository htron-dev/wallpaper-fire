<template>
    <div>

        <v-row align="start">
            <template
                v-for="wallpaper in state.wallpapers">
                <v-slide-x-transition :key="`transition-${wallpaper.id}`">
                    <v-col
                        cols="3"
                        md="3"
                        lg="2"
                        :key="wallpaper.id">
                        <v-skeleton-loader
                            v-show="state.loading"
                            type="image"/>
                        <library-item
                            v-show="!state.loading"
                            :wallpaper="wallpaper"
                            @use-wallpaper="useWallpaper(wallpaper)"
                            @click="selectWallpaper(wallpaper)"
                            @edit="editWallpaper"
                            @delete="handleDeleteWallpaper"
                        />
                    </v-col>
                </v-slide-x-transition>
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
                    @close="state.dialog = false;"
                    @submit="setLoading"
                />
            </v-dialog>
            <w-alert
                v-model="state.alert"
                @positive="deleteWallpaper"
                @negative="state.editedItem = null"
            />
            <v-fab-transition>
                <v-btn
                    class="library-add-button"
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
    </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, watch } from "@vue/composition-api";
import { useStore, Wallpaper } from "@/store";

export default createComponent({
    name: "Library",
    components: {
        LibraryItem: () => import("./LibraryItem.vue"),
        LibraryForm: () => import("./LibraryForm.vue"),
        LibraryDrawer: () => import("./LibraryDrawer.vue")
    },
    setup () {
        const store = useStore();
        const state: any = reactive({
            loading: true,
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
        const setLoading = () => {
            state.loading = true;
            setTimeout(() => {
                state.loading = false;
            }, 800);
        };
        setLoading();

        const useWallpaper = (wallpaper: Wallpaper) => {
            store.dispatch("setDescktopWallpaper", wallpaper);
        };
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
        const deleteWallpaper = () => {
            store.dispatch("wallpaper/delete", state.editedItem.id);
            state.editedItem = null;
        };

        return {
            state,
            selectWallpaper,
            editWallpaper,
            deleteWallpaper,
            setLoading,
            handleDeleteWallpaper,
            useWallpaper
        };
    }
});
</script>
