<template>
  <v-navigation-drawer
    permanent
    :mini-variant="state.mini"
    v-bind="$attrs">
      <v-list>

        <v-list-item>
          <v-list-item-action>
            <v-btn color="red" icon>
              <v-icon
                @click="state.mini = !state.mini"
                large>mdi-fire</v-icon>
              </v-btn>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Wallpaper Fire</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item
          v-for="item in state.menuItems"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";

export default createComponent({
    setup () {
        const state = reactive({
            mini: false,
            menuItems: [
                {
                    title: "Wallpapers",
                    icon: "mdi-image-multiple",
                    to: { name: "wallpaper" }
                },
                {
                    title: "Settings",
                    icon: "mdi-settings",
                    to: { name: "settings" }
                }
            ]
        });
        return {
            state
        };
    }
});
</script>

<style>

</style>
