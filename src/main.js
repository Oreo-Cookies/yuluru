import Vue from 'vue'
import App from './App.vue'
import router from './router/router.config'
import './routerNext'

import vant from 'vant'
import { Toast } from "vant";
import 'vant/lib/index.css'

import { VueAxios } from '@/axios/axios'
import { store, mutations } from './axios/simpleStore'
import './untils/vconsole.config'

import buttons from "./components/buttons";
import label from "./components/label";
import ocr from "./components/ocr";
import tip from "./components/tip";

Vue.use(VueAxios)
Vue.use(vant)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$_store = store
Vue.prototype.$_mutations = mutations


Vue.component('my-buttons', buttons)
Vue.component('my-label', label)
Vue.component('my-ocr', ocr)
Vue.component('my-tip', tip)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
