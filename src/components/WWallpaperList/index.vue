<template>
    <v-list class="pt-0">
        <template v-if="!loading">
            <v-list-item
                v-for="wallpaper in wallpapers"
                :key="wallpaper.id"
                :disabled="disabled"
                @click="handleSelectItem(wallpaper)"
            >

                <v-list-item-action v-if="showSelect">
                    <v-checkbox
                        v-model="state.model"
                        :value="wallpaper.id"
                    />
                </v-list-item-action>

                <v-list-item-avatar size="60px">
                    <v-img
                        v-if="wallpaper.thumb"
                        :src="'file://' + wallpaper.thumb"
                    />
                    <v-icon v-else size="50px">mdi-image</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ wallpaper.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ new Date(wallpaper.timestamp).toLocaleString() }}</v-list-item-subtitle>
                    <v-list-item-subtitle class="caption">{{ wallpaper.path }}</v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>
        </template>
        <template v-else>
            <v-skeleton-loader
                v-for="i in wallpapers.length"
                :key="i"
                loading
                height="94"
                type="list-item-avatar-three-line"
            >
            </v-skeleton-loader>
        </template>
    </v-list>
</template>

<script lang="ts">
import { createComponent, computed, reactive } from "@vue/composition-api";
import { Wallpaper } from "@/store/modules/wallpaper/state";
const fs = window.require("fs");
type Props = {
    wallpapers: Wallpaper[];
    value: number[];
    loading: boolean;
    showSelect: boolean;
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
        loading: {
            type: Boolean,
            required: false,
            default: false
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
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup (props, { emit }) {
        const state = reactive({
            items: [],
            model: computed<number[]>({
                get (): number[] {
                    return props.value;
                },
                set (value: number[]): void {
                    emit("input", value);
                }
            })
        });
        const handleSelectItem = (wallpaper: Wallpaper) => {
            if (props.showSelect) {
                const index = state.model.indexOf(wallpaper.id);
                if (index !== -1) {
                    state.model.splice(index, 1);
                } else {
                    state.model.push(wallpaper.id);
                }
            } else {
                emit("select-wallpaper", wallpaper);
            }
        };

        const thumbExists = async (path: string) => {
            try {
                await fs.promises.access(path);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        };

        return {
            state,
            handleSelectItem,
            thumbExists
        };
    }
});
</script>
