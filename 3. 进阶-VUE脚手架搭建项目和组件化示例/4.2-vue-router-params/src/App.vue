<template>
    <div id="app">
        <div class="nav">
            <router-link to="/">首页</router-link>
            <router-link to="/hello">欢迎页</router-link>
            <button @click="btnClick">点我1</button>
            <button @click="btnClick02">点我2</button>
            <button @click="btnClick03">点我3</button>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data(){
            return {

            }
        },
        methods:{
            btnClick(){
               window.console.log("btnClick......");
                //第1种：指定路径，如path:xxx
                //注意接收：this.$route.query
                let route = {
                    path: "/myCpn",
                    query: {
                        id:"123456788"
                    }
                }
                this.$router.push(route);
            },
            btnClick02(){
                window.console.log("btnClick 02......");
                //第2种：指定路由名称传参方式,如：name=xxxx
                //注意接收：this.$route.params
                let route = {
                    name: "myCpn02",
                    params: {
                        user:{
                            id:1,
                            name:'张三'
                        },
                        type:'水果'
                    }
                }
                this.$router.push(route);
            },
            btnClick03(){
                window.console.log("btnClick 03......");
                //第3种：可变路径  path:'/more/:type/:name/:id',
                let type = '球类';
                let name = '篮球';
                let id = 133;
                let route = {
                    path: `/myCpn03/${type}/${name}/${id}`
                }
                this.$router.push(route);
            },
        }
    }
</script>

<style>
    #app a {
        margin: 2px 5px;
    }
    .nav {
        display: flex;
        padding: 3px;
        background-color: #D8E1FF;
        border: #B3C0D1 solid 1px;
    }
</style>
