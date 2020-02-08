<template>
    <v-row
        align="stretch"
        justify="center"
        class="fill-height">
        <v-col cols="12">
            <v-card class="fill-height" tile>
                <v-card-title>
                    Modules
                </v-card-title>
                <v-card-text>
                    <v-radio-group
                        v-model="state.module"
                        mandatory
                        persistent-hint
                        hint="Current only module avaliable"
                    >
                        <v-radio
                            :label="state.module"
                            :value="state.module"
                        />
                    </v-radio-group>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { createComponent } from "@vue/composition-api";

export default createComponent({
    setup () {
        const state = {
            module: "KDE Module"
        };
        return {
            state
        };
    }
});
</script>

<style>

</style>
