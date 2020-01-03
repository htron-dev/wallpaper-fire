<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-card height="100%">
        <v-card-text>
          wallaper view
          <WallpaperList />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { createComponent } from "@vue/composition-api";

export default createComponent({
    components: {
        WallpaperList: () => import("./WallpaperList")
    },
    setup () {
        return {

        };
    }
});
</script>

<style>

</style>
