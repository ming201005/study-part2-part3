import  Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 解决重复点击导航路由报错
const newPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return newPush.call(this, location).catch(err => err);
}

//引入的vue组件
const Hello = ()=>import("../components/HelloWorld");
const MyCpn     = ()=>import("../components/MyCpn");
const Param108 =()=>import("../components/10.8.Params");
const Param109 =()=>import("../components/10.9.Params");
const Param1010=()=>import("../components/10.10.Params");
const Param1012=()=>import("../components/10.12.Params");
//路由配置
const routes = [
    {
        path : '/hello',
        name : 'hello',
        component:Hello
    },
    {
        path : '/mycpn',
        name : 'mycpn',
        component:MyCpn
    },
    {
        path : '/param108',
        name : 'param108',
        component:Param108
    },
    {
        path : '/param109/:id',
        name : 'param109',
        component:Param109
    },
    {
        path : '/param1010',
        name : 'param1010',
        component:Param1010
    },
    {
        path : '/param1012',
        name : 'param1012',
        component:Param1012
    },
    {
        path : '/param1013/:id/:msg',
        name : 'param1013',
        component:Param1012
    }
];

const  router = new Router({
    routes,
    mode:'history'
});
export default router;