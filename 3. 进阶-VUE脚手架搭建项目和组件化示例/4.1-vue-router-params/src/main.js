import Vue from 'vue'
import App from './App.vue'
import myRouter from './router/Router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //如果以上import中myRouter取名和router一样
  //下方的router:myRouter 可以简写为：router
  router:myRouter
}).$mount('#app');





