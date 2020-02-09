<template>
    <v-app-bar
        app
        dense
    >
        <v-spacer />
        <v-menu
            v-model="state.menus.live"
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
                    :color="state.currentWallpaper ? 'red' : ''"
                    icon
                >
                    <v-icon>
                        mdi-access-point
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar
                    color="red"
                    dark
                    dense
                >

                    <v-toolbar-title>Playing</v-toolbar-title>
                </v-toolbar>
                <v-list-item
                    v-if="state.currentWallpaper"
                    @click="stopLiveWallpaper">
                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon>mdi-stop</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-content class="py-0">
                        <p class="caption ma-0">
                            Stop live wallpaper
                        </p>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-else>
                    <v-list-item-content class="py-0">
                        <p class="caption ma-0">
                            Nothing playing
                        </p>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-menu>
        <v-menu
            v-model="state.menus.notification"
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
                <v-list class="py-0" v-if="state.notifications.length > 0">
                    <template v-for="(notification, index) in state.notifications">
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
                            v-if="index !== state.notifications.length - 1 && notifications.length > 2"
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
            menus: {
                notification: false,
                live: false
            },
            notifications: computed<any[]>(() => store.state.user.notifications),
            currentWallpaper: computed<any>(() => store.state.wallpaper.current)
        });
        const unreadNotificationsLength = computed(() => {
            return state.notifications.filter(n => !n.readed).length;
        });
        const openExternalLink = store.state.openExternalLink;
        const removeNotification = (notification: any) => {
            state.menus.notification = false;
            store.dispatch("removeNotification", notification.id);
        };
        const clearAllNotifications = () => {
            state.menus.notification = false;
            store.dispatch("clearAllNotification");
        };
        const stopLiveWallpaper = () => {
            state.menus.live = false;
            store.dispatch("stopAllLiveWallpapers");
        };
        return {
            state,
            unreadNotificationsLength,
            openExternalLink,
            removeNotification,
            clearAllNotifications,
            stopLiveWallpaper
        };
    }
});
</script>
