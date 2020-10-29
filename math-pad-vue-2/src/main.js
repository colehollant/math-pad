import VueCompositionApi from '@vue/composition-api'
import '@/assets/css/tailwind.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
