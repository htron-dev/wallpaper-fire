<template>
    <v-card>
        <v-expand-transition>
            <v-skeleton-loader
                v-show="state.loading"
                type="card"/>
        </v-expand-transition>
        <v-expand-transition>
            <v-sheet
                height="250px"
                v-show="!state.loading">
                <div ref="wrapper" />
                <v-slider
                    v-if="state.mode === 'manual'"
                    v-model="state.slideComputed"
                    max="100"
                    min="1"
                />
                <v-card-actions class="justify-center w-thumbnail-picker-actions">
                    <v-btn
                        color="info"
                        @click="removeThumb"
                    >
                        Remove
                    </v-btn>
                    <v-btn color="info" @click="randomThumb">
                        Random
                    </v-btn>
                    <v-btn color="info" @click="state.mode = 'manual'">
                        Manual
                    </v-btn>
                </v-card-actions>
            </v-sheet>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, reactive, computed } from "@vue/composition-api";
import { thumbnailPicker } from "./functions";

export default createComponent({
    props: {
        path: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: false,
            defatul: null
        }
    },
    setup (props, { emit }) {
        // refs
        const wrapper = ref<HTMLElement>(null);
        let picker: any;

        const state: any = reactive({
            mode: "default",
            slide: null,
            slideComputed: computed({
                get () {
                    return state.slide;
                },
                set (value) {
                    if (value) {
                        picker.setPercentage(value);
                        state.slide = value;
                    }
                }
            }),
            loading: true,
            model: computed({
                get () {
                    return props.value;
                },
                set (value) {
                    emit("input", value);
                }
            })
        });

        const setLoading = () => {
            state.loading = true;
            setTimeout(() => {
                state.loading = false;
            }, 500);
        };
        const load = () => {
            if (!wrapper.value || !props.path) {
                return;
            }
            if (!picker) {
                picker = thumbnailPicker(wrapper.value, props.path);
                picker.on("setThumbnail", (base64: string) => {
                    state.model = base64;
                });
                picker.on("ready", () => {
                    if (state.model && state.model !== "") {
                        picker.setThumbnail(state.model);
                    }
                    setLoading();
                });
            }
        };

        onMounted(load);

        const randomThumb = () => {
            state.slideComputed = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        };
        const removeThumb = () => {
            state.model = null;
            state.mode = "default";
            picker.reset();
        };
        return {
            state,
            wrapper,
            randomThumb,
            removeThumb
        };
    }
});
</script>

<style scoped>
.w-thumbnail-picker-actions {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
