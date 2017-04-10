// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import 'babel-polyfill'
import Vue from 'vue'
// import moment from 'vue-moment'
import App from './App'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'
import { Interceptor } from 'helper/interceptor'
// import 'helper/prism'
import 'helper/filters'
import 'style/index'
// import 'highlight.js/styles/default.css'
import 'sweetalert2/dist/sweetalert2.min.css'
// Vue.use(moment)
Vue.use(vueResource)
Interceptor()
/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
