<template>
    <div v-if="wallpaper">
        <v-tooltip nudge-bottom="120%" top max-width="400px">
            <template v-slot:activator="{ on }">
                <v-card v-on="on">
                    <v-img
                        v-if='wallpaper.thumb'
                        class="white--text align-end"
                        height="200px"
                        :src="`file://${wallpaper.thumb}`"
                    >
                    </v-img>
                    <v-icon
                        v-else size="170">mdi-image</v-icon>
                </v-card>
            </template>
            <p class="caption ma-0">{{wallpaper.title}}</p>
        </v-tooltip>
    </div>
    <v-card v-else>
        <v-card-text class="text-center yellow--text text--darken-1">
            <v-icon color="yellow darken-1" size="170">mdi-alert</v-icon>
            <h2>Error</h2>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
    props: {
        wallpaper: {
            type: Object,
            required: true,
            default: null
        }
    },
    setup () {
        return {

        };
    }
});
</script>
