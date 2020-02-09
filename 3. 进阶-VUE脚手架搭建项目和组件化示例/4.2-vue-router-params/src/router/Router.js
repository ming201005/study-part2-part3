import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决重复点击导航路由报错
const newPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return newPush.call(this, location).catch(err => err);
}

const Hello = () => import('../components/HelloWorld');
const MyCpn = () => import('../components/MyCpn') ;
const MyCpn02 = () => import('../components/MyCpn-02') ;
const MyCpn03 = () => import('../components/MyCpn-03') ;

const routes = [
    {
        path: "/",
        name: "home",
        redirect: "/hello"
    },
    {
        path: "/hello",
        name: "hello",
        component: Hello
    },
    {
        path: "/myCpn",
        name: "myCpn",
        component: MyCpn
    },
    {
        path: "/myCpn02",
        name: "myCpn02",
        component: MyCpn02
    },
    {
        path: "/myCpn03/:type/:name/:id",
        name: "myCpn03",
        component: MyCpn03
    }
];
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;