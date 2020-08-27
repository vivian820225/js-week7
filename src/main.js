import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import jquery from 'jquery';
import 'bootstrap';
// Bus
import './bus';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';

import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.filter('currency', currencyFilter);

window.$ = jquery;

Vue.use(Loading);
Vue.component('Loading', Loading);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
