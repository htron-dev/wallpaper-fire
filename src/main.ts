import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCompositionApi from "@vue/composition-api";
import VueTheMask from "vue-the-mask";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import "@/components";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(VueTheMask);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
