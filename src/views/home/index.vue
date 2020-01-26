<template>
  <v-row class="home">

    <v-col cols="6">
      <list
        @select-item="setVideo"
        @delete-item="deleteVideo"
        :items="state.videos" />
    </v-col>

    <v-col cols="4">
      <v-btn @click="addVideo">add file</v-btn>
    </v-col>

    <v-col
      v-if="state.currentVideo"
      cols="12">
      <video
        controls
        width="100%"
        height="100%"
        :src="state.currentVideo" />
    </v-col>

  </v-row>
</template>

<script lang="ts">
import { reactive, computed } from "@vue/composition-api";

export default {
    name: "home",
    components: {
        List: () => import("./list.vue")
    },
    setup (props: any, { root }: any) {
        const state = reactive({
            videos: computed(() => root.$store.state.videos.all),
            currentVideo: computed(() => root.$store.state.videos.current)
        });

        root.$store.dispatch("setVideos");

        const addVideo = () => {
            root.$store.dispatch("addVideo");
        };

        const setVideo = (fileName: string) => {
            root.$store.dispatch("setCurrentVideo", fileName);
        };

        const deleteVideo = async (fileName: string) => {
            await root.$store.dispatch("deleteVideo", fileName);
        };

        return {
            state,
            addVideo,
            setVideo,
            deleteVideo
        };
    }
};
</script>
