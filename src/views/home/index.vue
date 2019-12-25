<template>
  <v-row class="home">
    <v-col cols="6">
      <list :items="state.files" />
    </v-col>
    <v-col cols="4">
      <video
        controls
        width="100%"
        height="100%"
        :src="state.video"></video>
        <v-btn @click="showPath">Teste</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { reactive } from "@vue/composition-api";
// const electron = require("../../../node_modules/electron/index")

export default {
  name: "home",
  components: {
    List: () => import("./list.vue")
  },
  setup () {
    const state = reactive({
      files: ["teste-"],
      video: "/home/henryque/Videos/[Eng Sub] Sewayaki Kitsune no Senko-san Anime PV.mp4"
    });

    const showPath = () => {
      // const userDataPath = (electron.app || electron.remote.app).getPath('userData');
  
      // console.log("teste")
      // console.log(userDataPath)
    }


    return {
      state,
      showPath
    }
  }
}
</script>
