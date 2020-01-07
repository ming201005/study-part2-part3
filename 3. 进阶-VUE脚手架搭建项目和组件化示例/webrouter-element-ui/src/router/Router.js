import  Vue from 'vue';
import VueRouter  from 'vue-router';

//用户信息列表
const  UserList = ()=>import("../components/UserList");
//添加用户信息
const  UserAdd  = ()=>import("../components/UserAdd");

Vue.use(VueRouter);
const  routesCfg = [

    {
        path:"/user/add",
        name:"userAdd",
        component:UserAdd
    },
    {
        path:"/user/list",
        name:"userList",
        component:UserList
    }
];

const router = new VueRouter({
    routes:routesCfg,
    model:'history'
});

export default router;
