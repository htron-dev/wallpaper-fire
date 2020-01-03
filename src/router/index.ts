import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./../views/home/index.vue")
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("./../views/settings/index.vue")
    },
    {
        path: "/wallpaper",
        name: "wallpaper",
        component: () => import("./../views/wallpaper/index.vue")
    }
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;
