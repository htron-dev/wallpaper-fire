<template>
    <v-app>
        <w-app-drawer />
        <w-app-bar />
        <v-content>
            <v-container fluid>
                <router-view v-if="state.ready" />
            </v-container>
        </v-content>
        <v-snackbar
            v-for="(notification, index) in notifications.filter(n => n.show)"
            v-model="notification.show"
            :color="notification.color"
            :timeout="notification.timeout"
            left
            :key="notification.message + Math.random()"
            class="mb-7"
            :style="`bottom: ${index * 60}px`"
        >
            {{ notification.message }}
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "@vue/composition-api";
import { provideStore, useStore } from "@/store/use-store";
const ipcRenderer = window.require("electron").ipcRenderer;
export default defineComponent({
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
            ipcRenderer.send("set-window-bounds");
            const { _actions } = store as any;
            // loop in all actions and execute all actions that match setup
            for (const action in _actions) {
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
        // handle the stop all wallpapers event
        ipcRenderer.on("stop-live-wallpaper", () => {
            store.dispatch("stopAllLiveWallpapers");
        });
        return {
            notifications,
            state,
            alerts
        };
    }
});
</script>
