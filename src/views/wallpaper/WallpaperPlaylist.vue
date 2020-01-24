<template>
    <v-row class="fill-height">
        <v-col cols="12">
            <v-card height="100%">
                <v-card-text>
                    <v-row style="min-height: 80vh;">

                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>    
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { useStore } from "@/store/use-store";
export default createComponent({
    setup () {
        const store = useStore();
        console.log(store);
        return {
          
        };
    }
});
</script>

<style>

</style>
