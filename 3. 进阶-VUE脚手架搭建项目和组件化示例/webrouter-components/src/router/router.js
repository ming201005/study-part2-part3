import  Vue from 'vue';
import Router from 'vue-router';

const HelloCpn = ()=>import("../components/HelloWorld");
const News     = ()=>import('../components/news/News');
const NewsInternational= ()=>import('../components/news/NewsInternational');
const NewsArmy     = ()=>import('../components/news/NewsArmy');
const NewsNBA     = ()=>import('../components/news/NewsNBA');


// 解决重复点击导航路由报错
const newPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return newPush.call(this, location).catch(err => err);
}
Vue.use(Router);

//路由配置
const routes = [
    {
        path : '/index',
        name : 'index',
        component:HelloCpn
    },
    {
        path : '/news',
        name : 'news',
        component:News,
        //路由独享守卫
        // beforeEnter:(to,from, next)=>{
        //     window.console.log(to,from);
        //     next();
        // },
        children:[
            {
                //国际新闻
                path : 'international',
                name : 'international',
                component:NewsInternational
            },
            {
                //军事
                path : 'army',
                name : 'army',
                component:NewsArmy
            },
            {
                //NBA
                path : 'nba',
                name : 'nba',
                component:NewsNBA
            }
        ]
    }
];

const  router = new Router({
        routes,
        mode:'history'
    });
export default router;