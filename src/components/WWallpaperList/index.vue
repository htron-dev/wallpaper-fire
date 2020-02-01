<template>
    <v-list class="pt-0">
        <v-list-item
            v-for="wallpaper in wallpapers"
            :key="wallpaper.id"
        >

            <v-list-item-action v-if="showSelect && showActions">
                <v-checkbox
                    v-model="state.model"
                    :value="wallpaper.id"
                />
            </v-list-item-action>

            <v-list-item-avatar size="60px">
                <v-img v-if="wallpaper.thumb" :src="'file://' + wallpaper.thumb" />
                <v-icon v-else size="50px">mdi-image</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ wallpaper.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ new Date(wallpaper.timestamp).toLocaleString() }}</v-list-item-subtitle>
                <v-list-item-subtitle class="caption">{{ wallpaper.path }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action v-if="showActions">
                <v-btn
                    color="grey lighten-1"
                    icon
                    @click.stop="$emit('delete' , wallpaper)"
                >
                    <v-icon>{{iconDelete}}</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { createComponent, computed, reactive } from "@vue/composition-api";
import { Wallpaper } from "@/store/modules/wallpaper/state";

type Props = {
    wallpapers: Wallpaper[],
    value: number[],
}

export default createComponent<Props>({
    props: {
        value: {
            type: Array,
            required: false,
            default: () => []
        },
        wallpapers: {
            type: Array,
            required: true,
            default: () => []
        },
        iconDelete: {
            type: String,
            required: false,
            default: "mdi-delete"
        },
        showSelect: {
            type: Boolean,
            required: false,
            default: false
        },
        showActions: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup (props, { emit }) {
        const state = reactive({
            model: computed<number[]>({
                get () {
                    return props.value;
                },
                set (value: number[]) {
                    emit("input", value);
                }
            })
        });
        return {
            state
        };
    }
});
</script>
