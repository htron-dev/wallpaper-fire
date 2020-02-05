<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <v-card height="100%">
                <v-card-text>
                    <v-row style="min-height: 80vh;">
                        <v-col>
                            <wallpaper-preview
                                :wallpaper="state.wallpaper"
                                @delete-wallpaper="handleDeleteWallpaper"
                                @edit-wallpaper="handleEditWallpaper"
                            />
                        </v-col>
                        <v-divider class="d-none d-lg-flex" vertical />
                        <v-col cols="12" md="12" lg="6">
                            <w-wallpaper-list
                                :loading="state.loading"
                                :wallpapers="state.wallpapers"
                                @select-wallpaper="(wallpaper) => state.wallpaper = wallpaper" />
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
                            <v-dialog v-model="state.wallpaperDialog" v-if="state.wallpaperDialog" max-width="1000">
                                <wallpaper-form
                                    :editable-item="state.editableItem"
                                    @close="reset" />
                            </v-dialog>
                            <v-dialog v-model="state.alertDialog" v-if="state.alertDialog" max-width="1000">
                                <v-card>
                                    <v-card-text>
                                        <div class="text-center">
                                            <v-icon
                                                class="d-block"
                                                color='warning'
                                                size="200"
                                            >
                                                mdi-alert
                                            </v-icon>
                                            <h2>{{$lodash.upperCase("Are you sure")}}</h2>
                                        </div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer />
                                        <v-btn
                                            color="error"
                                            @click="reset">No</v-btn>
                                        <v-btn
                                            color="success"
                                            @click="deleteWallpaper">Yes</v-btn>
                                        <v-spacer />
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">

import { createComponent, computed, reactive, watch } from "@vue/composition-api";
import { useStore } from "@/store/use-store";
import { Wallpaper } from "../../store/modules/wallpaper/state";

type WallpaperState = {
    wallpaper: Wallpaper | null,
    wallpapers: Wallpaper[],
    loading: boolean;
    wallpaperDialog: boolean;
    alertDialog: boolean;
    editableItem: null | any;
};

export default createComponent({
    components: {
        WallpaperForm: () => import("./WallpaperForm.vue"),
        WallpaperPreview: () => import("./WallpaperPreview.vue")
    },
    setup () {
        const store = useStore();

        const state = reactive<WallpaperState>({
            wallpaper: null,
            wallpapers: [],
            loading: true,
            wallpaperDialog: false,
            alertDialog: false,
            editableItem: null
        });

        watch(() => state.wallpaperDialog, (value) => {
            if (!value) {
                state.editableItem = null;
            }
        });

        const setWallpaperList = () => {
            state.loading = true;
            state.wallpapers = store.getters["wallpaper/getAll"];
            setTimeout(() => {
                state.loading = false;
            }, 1500);
        };

        const handleDeleteWallpaper = (wallpaper: Wallpaper) => {
            state.editableItem = wallpaper;
            state.alertDialog = true;
        };

        const handleEditWallpaper = (wallpaper: Wallpaper) => {
            state.editableItem = wallpaper;
            state.wallpaperDialog = true;
        };

        const deleteWallpaper = () => {
            store.dispatch("wallpaper/delete", state.editableItem.id);
            reset();
        };

        const reset = () => {
            setWallpaperList();
            state.wallpaper = null;
            state.editableItem = null;
            state.alertDialog = false;
            state.wallpaperDialog = false;
        };

        setWallpaperList();
        return {
            state,
            handleDeleteWallpaper,
            deleteWallpaper,
            handleEditWallpaper,
            reset
        };
    }
});
</script>

<style>

</style>
