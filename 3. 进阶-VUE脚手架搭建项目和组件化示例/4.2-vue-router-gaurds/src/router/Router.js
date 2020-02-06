import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Hello = () => import('../components/HelloWorld');
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
    }
];
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;