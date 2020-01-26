<template>
    <div>
        <v-combobox
            v-model="state.model"
            v-bind="$attrs"
            :rules="[rules.time]"
            prepend-icon="mdi-clock-outline"
            @click:prepend="state.dialog = true"
        />
        <v-dialog
            ref="dialog"
            v-model="state.dialog"
            :close-on-content-click="false"
            :return-value.sync="state.model"
            persistent
            max-width="290px"
        >
            <v-time-picker
                v-model="state.model"
                format="24hr"
                full-width
            >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="state.dialog = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(state.model)">OK</v-btn>
            </v-time-picker>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { reactive, createComponent, ref, computed, watch } from "@vue/composition-api";
export default createComponent({
    name: "WTimePicker",
    props: {
        value: {
            type: [String, Number],
            required: false,
            default: "00:00"
        }
    },
    setup (props, { emit }) {
        const convertMilisectionToMinutes = () => {};
        const state = reactive({
            inputText: false,
            dialog: false,
            model: computed<string>({
                get () {
                    return props.value.toString();
                },
                set (value) {
                    emit("input", value);
                }
            })
        });

        watch(() => state.dialog, (value) => {
            if (value) {
                if (!state.model.includes(":")) {
                    state.model = "00:00";
                }
            }
        });
        const rules = {
            time: (value: string) => {
                let valid = true;
                if (value && !value.includes(" ")) {
                    const [hours, minutes] = value.split(":");
                    if (!hours || !minutes) {
                        valid = false;
                    }

                    if (minutes && Number(minutes) > 59) {
                        valid = false;
                    }
                }

                return valid || "Invalid Time";
            }
        };
        return {
            state,
            rules
        };
    }
});
</script>
