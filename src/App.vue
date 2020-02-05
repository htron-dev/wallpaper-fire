<template>
    <v-app>
        <w-drawer app />
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
                        <router-view />
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
import { createComponent, computed } from "@vue/composition-api";
import { provideStore, useStore } from "@/store/use-store";

export default createComponent({
    components: {
        WDrawer: () => import("@/components/WDrawer/index.vue")
    },
    setup (props, { root }) {
        provideStore(root.$store);
        const store = useStore();
        store.dispatch("db/setDB");
        const { _actions } = store as any;
        // loop in all actions and execute all actions that match setup
        for (let action in _actions) {
            if (action.includes("setup")) {
                root.$store.dispatch(action);
            }
        }
        const notifications = computed<any[]>(() => store.state.notifications);
        const alerts = computed<any[]>(() => store.state.alerts);
        return {
            notifications,
            alerts
        };
    }
});
</script>
