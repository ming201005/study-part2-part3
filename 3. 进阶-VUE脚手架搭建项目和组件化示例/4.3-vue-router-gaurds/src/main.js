import Vue from 'vue'
import App from './App'

import myRouter from './router/Router'
import DateUtil from './plugins/DateUtil'
Date.prototype.format = DateUtil;

Vue.config.productionTip = false;

//打印信息
Vue.prototype.log = function (msg) {
  let d = new Date();
  let FORMAT = "yyyy-MM-dd hh:mm:ss";
  window.console.log("[",d.format(FORMAT),"]==>",msg)
}

//VUE实例
new Vue({
  render: h => h(App),
  //如果以上import中myRouter取名和router一样
  //下方的router:myRouter 可以简写为：router
  router:myRouter
}).$mount('#app')
