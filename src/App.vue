<template>
    <v-app>
        <w-drawer app />
        <v-content>
            <v-container fluid fill-height>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { provideStore } from "@/store/use-store";

export default createComponent({
    components: {
        WDrawer: () => import("@/components/WDrawer/index.vue")
    },
    setup (props, { root }) {
        provideStore(root.$store);
        root.$store.dispatch("db/setDB");
        return {};
    }
});
</script>
