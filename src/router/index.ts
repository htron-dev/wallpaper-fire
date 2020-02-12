import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        redirect: "/wallpaper"
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("./../views/settings/index.vue")
    },
    {
        path: "/wallpaper",
        name: "wallpaper",
        redirect: "/wallpaper/all",
        component: () => import("./../views/wallpaper/index.vue"),
        children: [
            {
                path: "all",
                name: "library",
                component: () => import("./../views/wallpaper/library/Library.vue")
            },
            {
                path: "playlist",
                name: "wallpaper-playlist",
                component: () => import("./../views/wallpaper/WallpaperPlaylist.vue")
            }

        ]
    }
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;
