import Vue from 'vue';
import Router from 'vue-router';

// 解决重复点击导航路由报错
const newPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return newPush.call(this, location).catch(err => err);
}

//路由使用
Vue.use(Router);

const HelloCpn = ()=>import("./components/HelloWorld");
const MyCpn = ()=>import("./components/MyCpn");
//
const VantTestCpn = ()=>import("./components/VantTestCpn");

const MoreParamsCpn =()=> import ('./components/MoreParams');

const CodeTestCpn =()=> import ('./components/CodeTestCpn');
//CodeTestCpn的子组件（嵌套路由用）
const CodeC1 = ()=>import("./components/CodeChild1");
const CodeC2 = ()=>import("./components/CodeChild2");
//更多组件导入

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {
        // path:''也可以
        path: '/',
        name:'index',
        redirect:'/home'
    },
    {
        path: '/home',
        name:'home',
        meta:{
            title:"首页"
        },
        component: MyCpn
    },
    {
        path: '/hello',
        name:'hello',
        props:true,
        meta:{
            title:"关于"
        },
        component: HelloCpn
    },
    {
        path:'/vant/:id',
        name:'vant',
        props:true,
        meta:{
            title:"Vant使用"
        },
        component:VantTestCpn
    },
    {
        path:'/more/:type/:name/:id',
        name:"moreLike",
        meta:{
            title:"更多"
        },
        component:MoreParamsCpn
    },
    {
        path:'/code',
        name:'code',
        meta:{
            title:"代码测试"
        },

        component:CodeTestCpn,
        children:[
            {
              path:'',
              redirect: 'c1'
            },
            {
                path: 'c1',
                name:'c1',
                component: CodeC1
            },
            {
                path: 'c2',
                name:'c2',
                component: CodeC2
            }
        ]
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const  router = new Router({
    mode:'history', //去掉#
    // (缩写) 相当于 routes: routes
    routes
});

//设置标题(全局守卫)
router.beforeEach((to,from,next)=>{
    // window.console.log(to, from);

    let path = to.path;
    window.console.log(path);
    //1、判断哪些路径需要用户登录
    //2、判断是否有没有登录。。。。
    //3、放行
    next();
    document.title = to.matched[0].meta.title;
});


export default router;