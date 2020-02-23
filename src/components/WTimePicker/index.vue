<template>
    <div>
        <v-combobox
            v-model="state.model"
            v-bind="$attrs"
            :items="times"
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
import { reactive, createComponent, computed, watch } from "@vue/composition-api";
export default createComponent({
    name: "WTimePicker",
    props: {
        value: {
            type: [String, Number],
            required: false,
            default: "00:00"
        },
        returnMiliseconds: {
            type: Boolean,
            required: false,
            default: false
        },
        times: {
            type: Array,
            required: false,
            default: () => [
                "00:05",
                "00:10",
                "00:15",
                "00:20",
                "00:25",
                "00:30",
                "01:00",
                "01:30",
                "02:00",
                "1 day",
                "2 days",
                "3 days",
                "5 days",
                "10 days"
            ]
        }
    },
    setup (props, { emit }) {
        const toMiliseconds = (time: string): number => {
            if (time.includes(":")) {
                const [hours, minutes] = time.split(":");
                return (Number(minutes) * 60000) + (Number(hours) * 3600000);
            } else if (time.includes("day")) {
                const [days] = time.split(" ");
                return Number(days) * 86400000;
            } else {
                return -1;
            }
        };
        const milisecondsToTime = (time: number) => {
            let minutes: any = Math.floor((time / (1000 * 60)) % 60);
            let hours: any = Math.floor((time / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;

            return hours + ":" + minutes;
        };
        const milisecondsToDays = (time: number) => {
            return time / 86400000 + " days";
        };

        const state = reactive({
            inputText: false,
            dialog: false,
            model: computed<string | null>({
                get () {
                    if (!props.value) {
                        return null;
                    }
                    if (props.returnMiliseconds && props.value >= 86400000) {
                        return milisecondsToDays(Number(props.value));
                    } else if (props.returnMiliseconds) {
                        return milisecondsToTime(Number(props.value));
                    }
                    return props.value.toString();
                },
                set (value) {
                    if (!value) {
                        return;
                    }
                    if (props.returnMiliseconds) {
                        const milisecs = toMiliseconds(value);
                        emit("input", milisecs);
                    } else {
                        emit("input", value);
                    }
                }
            })
        });

        watch(() => state.dialog, (value) => {
            if (value) {
                if (state.model && !state.model.includes(":")) {
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
