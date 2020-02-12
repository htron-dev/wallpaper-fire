<template>
    <v-row
        align="start"
        no-gutters>
        <v-col cols="12">
            <wallpaper-Toobar />
        </v-col>
        <v-fade-transition>
            <v-col cols="12">
                <router-view></router-view>
            </v-col>
        </v-fade-transition>
    </v-row>
</template>

<script>
export default {
    components: {
        WallpaperToobar: () => import("./WallpaperToobar.vue")
    }
};
</script>
