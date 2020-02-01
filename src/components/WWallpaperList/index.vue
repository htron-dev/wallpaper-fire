<template>
    <v-list class="pt-0">
        <v-list-item
            v-for="wallpaper in wallpapers"
            :key="wallpaper.id"
            @click="$emit('selected', wallpaper)"
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
                    @click.stop="$emit('delete' , wallpaper)"
                >
                    <v-icon >mdi-delete</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { Wallpaper } from "@/store/modules/wallpaper/state";

type Props = {
    wallpapers: Wallpaper[]
}

export default createComponent<Props>({
    props: {
        wallpapers: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    setup (props) {
        return {};
    }
});
</script>
