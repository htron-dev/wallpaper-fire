<template>
  <v-list>
      <v-list-item
        v-for="item in items"
        :key="item">
            item
      </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { reactive }from "@vue/composition-api";

export default {
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    setup(){
        
        const state = reactive({

        });

        return {
            state,
        }
    }
}

</script>

<style>

</style>