import VueMathjax from 'vue-mathjax'
import VueCompositionApi from '@vue/composition-api'
import PortalVue from 'portal-vue'
import '@/assets/css/tailwind.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.use(VueMathjax)

Vue.use(PortalVue)
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
