<template>
    <div id="app">
        <div class="nav">
            <div class="nav-item">
                <router-link :to="{path: '/home', query: { id: 123}}">首页</router-link>
            </div>
            <div class="nav-item">
                <router-link
                        :to="{ name: 'hello',
                               params: { id: 123,msg:'你好，hello！'}
                              }"
                >欢迎页面</router-link>
            </div>
            <div class="nav-item">
                <router-link to="/vant/15">商品清单</router-link>
            </div>
            <div class="nav-item">
                <!--<router-link to="/more/水果/苹果/12">多参数</router-link>-->
                <button @click="btnClick2">多参数(按钮点击)</button>
            </div>
            <div class="nav-item">
                <button @click="btnClick1">点我一下</button>
            </div>
        </div>
        <hr>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>
<script>
    export default {
        name: 'app',
        data(){
            return {

            }
        },
        created(){

        },
        methods:{

            btnClick(){
                this.log("here....btnClick==>");
                //第一种：指定路由名称传参方式,如：name=xxxx
                //注意接收：this.$route.params
                let route = {
                     name: "code",
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

            //按钮点击方式跳转、传参
            btnClick1(){
                this.log("here....btnClick1==>");
                //第二种：指定路径，如path:xxx
                //注意接收：this.$route.query
                let route = {
                    path: "/code",
                    query: {
                        user:{
                            id:1,
                            name:'张三'
                        },
                        type:'水果'
                    }
                }
                this.$router.push(route);
            },

            btnClick2(){
                this.log("here....btnClick2==>");
                this.log(this.$router);
                this.log(this.$route);
                //第三种：可变路径  path:'/more/:type/:name/:id',
                let type = '球类';
                let name = '篮球';
                let id = 145;
                const  url = `/more/${type}/${name}/${id}`;
                this.$router.push(url);
            }
        }
    }
</script>
<style scoped>
    .router-link-active{
        background-color: #BABABA;color: #000000;
    }
    .nav{
        height: 30px;line-height: 30px;display: flex;
    }
    .nav .nav-item {
        margin: 2px 0px 2px 2px;padding: 3px;
    }
</style>
