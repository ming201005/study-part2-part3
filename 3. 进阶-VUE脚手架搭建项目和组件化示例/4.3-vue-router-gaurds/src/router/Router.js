import Vue from 'vue';
import Router from 'vue-router';

//const HelloCpn = ()=>import("../components/HelloWorld");
const HelloCpn = () => import("../components/HelloWorld");
const News = () => import('../components/news/News');
const NewsInternational = () => import('../components/news/NewsInternational');
const NewsArmy = () => import('../components/news/NewsArmy');
const NewsNBA = () => import('../components/news/NewsNBA');


// 解决重复点击导航路由报错
const newPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return newPush.call(this, location).catch(err => err);
}
Vue.use(Router);


//路由配置
const routes = [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: "首页"
        },
        component: HelloCpn
    },
    {
        path: '/news',
        name: 'news',
        meta: {
            title: "新闻"
        },
        component: News,
        //路由独享守卫
        beforeEnter:(to,from, next)=>{
            window.console.log(to,from);
            // 1.可以利用路由独享判断登录（这只是一种方案，这不是最佳方案）
            // 2.可以用于其他场景
            let getToken = "1";
            if(getToken==1) {
                next();
            }else{
                window.console.log(to,from);
            }
        },
        children: [
            {
                //国际新闻
                path: 'international',
                name: 'international',
                meta: {
                    title: "新闻-国际新闻"
                },
                component: NewsInternational
            },
            {
                //军事
                path: 'army',
                name: 'army',
                meta: {
                    title: "军事新闻"
                },
                component: NewsArmy
            },
            {
                //NBA
                path: 'nba',
                name: 'nba',
                meta: {
                    title: "NBA新闻"
                },
                component: NewsNBA
            }
        ]
    }
];

const router = new Router({
    routes,
    mode: 'history'
});

//设置标题(全局守卫)
router.beforeEach((to, from, next) => {
    // window.console.log(to, from);

    let path = to.path;
    window.console.log(path);
    //1、判断哪些路径需要用户登录
    //2、判断是否有没有登录。。。。
    //3、放行
    next();
    let marr = to.matched;
    let len = marr.length;
    document.title = to.matched[len - 1].meta.title;
});

export default router;