<template>
  <v-list>
      <v-list-item
        @click="$emit('select-item', item)"
        v-for="item in items"
        :key="item">
        <v-list-item-content>
            {{item}}
        </v-list-item-content>
        <v-list-item-action>
            <v-btn
                @click.stop="$emit('delete-item', item)"
                icon
                color="error">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-list-item-action>
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