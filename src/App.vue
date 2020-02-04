<template>
    <v-app>
        <w-drawer app />
        <v-content>
            <v-container fluid fill-height>
                <router-view />
            </v-container>
        </v-content>
        <v-snackbar
            v-for="notification in notifications.filter(n => n.show)"
            v-model="notification.show"
            :color="notification.color"
            right
            :key="notification.message + Math.random()"
        >
            {{ notification.message }}
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
import { createComponent, computed } from "@vue/composition-api";
import { provideStore } from "@/store/use-store";

export default createComponent({
    components: {
        WDrawer: () => import("@/components/WDrawer/index.vue")
    },
    setup (props, { root }) {
        provideStore(root.$store);
        root.$store.dispatch("db/setDB");
        root.$store.dispatch("setup");
        const notifications = computed<any[]>(() => root.$store.state.notifications);
        return {
            notifications
        };
    }
});
</script>
