
import Vue from "vue";
import Vuetify from "vuetify";
import VueComposition from "@vue/composition-api";
import lodash from "lodash";
import "./globals";
import "@/components";
Vue.prototype.$lodash = lodash;

Vue.use(Vuetify);
Vue.use(VueComposition);

const requestAnimationFrame = (fn: Function) => fn();

globalThis.requestAnimationFrame = requestAnimationFrame;
globalThis.HTMLCanvasElement.prototype.getContext = () => {
    return null;
};
