<template>
    <v-app>
        <w-app-drawer />
        <w-app-bar />
        <v-content>
            <v-container fluid fill-height>
                <v-row no-gutters>
                    <v-col
                        v-for="(alert, index) in alerts"
                        :key="index"
                        cols="12"
                    >
                        <v-alert
                            class="ma-0"
                            :value="true" color="red">
                            teste
                        </v-alert>
                    </v-col>
                    <v-col cols="12">
                        <router-view v-if="state.ready" />
                    </v-col>

                </v-row>
            </v-container>
        </v-content>
        <v-snackbar
            v-for="(notification, index) in notifications.filter(n => n.show)"
            v-model="notification.show"
            :color="notification.color"
            right
            :key="notification.message + Math.random()"
            :style="`bottom: ${index * 60}px`"
        >
            {{ notification.message }}
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
import { createComponent, computed, reactive } from "@vue/composition-api";
import { provideStore, useStore } from "@/store/use-store";
const ipcRenderer = window.require("electron").ipcRenderer;
export default createComponent({
    setup (props, { root }) {
        const state = reactive({
            ready: false
        });
        provideStore(root.$store);
        const store = useStore();
        const notifications = computed<any[]>(() => store.state.notifications);
        const alerts = computed<any[]>(() => store.state.alerts);
        const load = async () => {
            const configPath = await ipcRenderer.invoke("setup-database");
            await store.dispatch("db/init", configPath);
            const { _actions } = store as any;
            // loop in all actions and execute all actions that match setup
            for (let action in _actions) {
                if (action.includes("setup")) {
                    root.$store.dispatch(action);
                }
            }
            if (notifications.value.length === 0) {
                store.dispatch("setUserNotifications");
            }
            state.ready = true;
        };

        load();
        return {
            notifications,
            state,
            alerts
        };
    }
});
</script>
