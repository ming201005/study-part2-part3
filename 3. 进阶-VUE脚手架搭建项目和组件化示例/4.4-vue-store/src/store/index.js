import Vue from 'vue';
import Vuex from 'vuex';
//加载mutations和actions
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
//加载模块
import  users from './models/users';
import  products from './models/products';
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count : 0,
        user:{
            id:1,
            name:'张三'
        }
    },
    mutations,
    //和服务端相关的逻辑
    actions,
    getters,
    modules:{
        users,
        products
    }
});
export default store;