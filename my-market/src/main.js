import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import _axios from './components/axios/_axios';

import './assets/fonts/iconfont.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/display.css'


Vue.config.productionTip = false
Vue.prototype._axios = _axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
