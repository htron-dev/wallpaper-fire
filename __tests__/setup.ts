import Vue from "vue";
import Vuetify from "vuetify";
import VueComposition from "@vue/composition-api";
import lodash from "lodash";
Vue.prototype.$lodash = lodash;
Vue.use(Vuetify);
Vue.use(VueComposition);
