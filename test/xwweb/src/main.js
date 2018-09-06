// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import 'babel-polyfill'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

import jquery from '@/assets/js/jquery.js'
import common from '@/assets/js/common.js'
import index from '@/assets/js/index.js'
//import loan from '@/assets/js/index/loan.js'

import windowShut from '@/assets/js/windowShut.js'


import light7 from '../static/light7/js/light7.js'
import i18n from '../static/light7/js/i18n/cn.min.js'
import light7Swiper from '../static/light7/js/light7-swiper.min.js'
//import light7City from '../static/light7/js/light7-city-picker.js'

import axios from 'axios'
import bus from './bus'
import Vuex from 'vuex'
import store from './vuex/store.js'

//import refundCalendar from '@/assets/js/me/refund-calendar'
import 'babel-polyfill';
console.info("COMPILE_DATE:%s", process.env.COMPILE_DATE);

//Vue.prototype.$ = jquery
Vue.prototype.light7 = light7
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.config.productionTip = false
Vue.config.debug = true;
Vue.prototype.$axios = axios
/* eslint-disable no-new */
let data = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// router.afterEach((to, from, next) => {
//   if (from.name != null) {
//     if (from.name == "detail") {
//       data.$store.commit('saveObj', {detail:from.params})
//     }
//   } else {
//     // console.log('页面刷新')
//     data.$store.commit("saveState")
//   }
//   // console.log(to)
//   // console.log(from)
//   // console.log(data.$store.state);
//   // next();
// });
