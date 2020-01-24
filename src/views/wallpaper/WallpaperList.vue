<template>
    <v-navigation-drawer
        right
        max-height="100%"
        width="100%"
        permanent
    >
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
            <wallpaper-list-form @close="state.wallpaperDialog = false" />
        </v-dialog>

        <v-dialog v-model="state.alertDialog" v-if="state.alertDialog" max-width="1000">
            <v-card>
                <v-card-text>Are you sure</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="deleteWallpaper">Yes delete</v-btn>
                    <v-btn @click="state.alertDialog = false">Cancel</v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-list class="pt-0">
            <v-list-item
                v-for="wallpaper in state.wallpapers.all"
                :key="wallpaper.id"
                @click="setwallpaper(wallpaper)"
            >
                <v-list-item-avatar size="60px">
                    <v-img v-if="wallpaper.thumb" :src="wallpaper.thumb" />
                    <v-icon v-else size="50px">mdi-image</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ wallpaper.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ new Date(wallpaper.timestamp).toLocaleString() }}</v-list-item-subtitle>
                    <v-list-item-subtitle class="caption">{{ wallpaper.path }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action >
                    <v-btn
                        color="grey lighten-1"
                        icon
                        @click.stop="handleDeleteWallpaper(wallpaper)"
                    >
                        <v-icon >mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { createComponent, computed, reactive, Ref } from "@vue/composition-api";
import { useStore } from "@/store/use-store";

type WallpaperListSate = {
    wallpapers: any;
    wallpaperDialog: boolean;
    alertDialog: boolean;
    editableItem: null | any;
};

export default createComponent({
    components: {
        WallpaperListForm: () => import("./WallpaperListForm.vue")
    },
    setup (props, { emit }) {
        const store = useStore();

        store.dispatch("setWallpapers");

        const state = reactive<WallpaperListSate>({
            wallpapers: computed(() => store.state.wallpapers),
            wallpaperDialog: false,
            alertDialog: false,
            editableItem: null
        });

        const setwallpaper = (wallpaper: any) => {
            emit("select-wallpaper", wallpaper);
        };

        const handleDeleteWallpaper = (item: any) => {
            state.editableItem = item;
            state.alertDialog = true;
        };

        const deleteWallpaper = () => {
            store.dispatch("deleteWallpaper", state.editableItem.id);
            state.editableItem = null;
            state.alertDialog = false;
        };

        return {
            state,
            setwallpaper,
            deleteWallpaper,
            handleDeleteWallpaper
        };
    }
});
</script>

<style>
</style>
