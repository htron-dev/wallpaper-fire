<template>
    <v-app-bar
        app
        dense
    >
        <v-spacer />
        <v-menu
            v-model="state.menu"
            offset-y
            left
            min-width="450px"
            max-width="450px"
            max-height="450px"
            :close-on-content-click="false"
        >
            <template v-slot:activator="{ on }">

                <v-btn
                    v-on="on"
                    icon
                >
                    <v-badge
                        overlap
                        color="red"
                        bottom
                        left
                        :content="unreadNotificationsLength"
                        :value="unreadNotificationsLength"
                    >
                        <v-icon>
                            mdi-bell
                        </v-icon>
                    </v-badge>
                </v-btn>
            </template>
            <v-card>

                <v-toolbar
                    color="info"
                    dark
                    dense
                >

                    <v-toolbar-title>Notifications</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                dark
                                v-on="on"
                                @click="clearAllNotifications"
                            >mdi-broom</v-icon>
                        </template>
                        <span>Clear all</span>
                    </v-tooltip>
                </v-toolbar>
                <v-list class="py-0" v-if="notifications.length > 0">
                    <template v-for="(notification, index) in notifications">
                        <v-card flat :key="notification.id">
                            <v-card-text class="pa-0">
                                <v-list-item
                                    :inactive="!notification.link"
                                    @click="notification.link ? openExternalLink(notification.link.href) : undefined">
                                    <v-list-item-avatar>
                                        <v-icon
                                            :color="notification.color"
                                        >
                                            {{notification.icon ? notification.icon : "mdi-bell" }}
                                        </v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <p class="caption ma-0">
                                            {{notification.message}}
                                        </p>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-btn
                                            :color="notification.color"
                                            @click.stop="removeNotification(notification)"
                                            icon>
                                            <v-icon small>mdi-close</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-card-text>
                        </v-card>
                        <v-divider
                            :key="`divider ${index}`"
                            v-if="index !== notifications.length - 1 && notifications.length > 2"
                        />
                    </template>
                </v-list>
                <v-list v-else>
                    <v-list-item>
                        <v-list-item-content>
                            <p class="caption ma-0">
                                No notifications
                            </p>
                        </v-list-item-content>
                        <v-list-item-action></v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script lang="ts">
import { createComponent, computed, reactive } from "@vue/composition-api";
import { useStore } from "../../store/use-store";

export default createComponent({
    setup () {
        const store = useStore();
        const state = reactive({
            menu: false
        });
        const notifications = computed<any[]>(() => store.state.user.notifications);
        const unreadNotificationsLength = computed(() => {
            return notifications.value.filter(n => !n.readed).length;
        });
        const openExternalLink = store.state.openExternalLink;
        const removeNotification = (notification: any) => {
            state.menu = false;
            store.dispatch("removeNotification", notification.id);
        };
        const clearAllNotifications = () => {
            state.menu = false;
            store.dispatch("clearAllNotification");
        };
        return {
            state,
            notifications,
            unreadNotificationsLength,
            openExternalLink,
            removeNotification,
            clearAllNotifications
        };
    }
});
</script>
