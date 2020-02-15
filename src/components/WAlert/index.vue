<template>
    <v-dialog
        max-width="450px"
        v-model="state.model">
        <v-card >
            <v-card-text class="text-center">
                <v-icon
                    size="200"
                    color="warning"
                >
                    mdi-alert
                </v-icon>
                <h3> Are you sure </h3>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    color="success"
                    @click="sendResponse('positive')"
                >
                    Yes
                </v-btn>
                <v-btn
                    color="error"
                    @click="sendResponse('negative')"
                >
                    No
                </v-btn>
                <v-spacer />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";

export default createComponent({
    props: {
        value: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup (props, { emit }) {
        const state = reactive({
            model: computed<boolean>({
                get () {
                    return props.value;
                },
                set (value) {
                    emit("input", value);
                }
            })
        });

        const sendResponse = (event: string) => {
            emit(event);
            state.model = false;
        };

        return {
            state,
            sendResponse
        };
    }
});
</script>
