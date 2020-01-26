<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <wallpaper-Toobar />
        </v-col>
        <v-col cols="12">
            <router-view></router-view>
        </v-col>
    </v-row>
</template>

<script>
export default {
    components: {
        WallpaperToobar: () => import("./WallpaperToobar.vue")
    }
}
</script>

<style>

</style>