<template>
    <div>
        <h2>这是新闻栏目</h2>
        <hr>
        <div class="box">
            <div class="left">
                <router-link to="/news/international">国际新闻</router-link>
                <router-link to="/news/army">军事演习</router-link>
                <router-link to="/news/nba">NBA赛事</router-link>
            </div>
            <div class="right">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "News",
        data(){
            return{
                path : '/news/nba'
            }
        },
        activated(){
            window.console.log('---activated----');
            this.$router.push(this.path)
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            this.path = from.fullPath;
            window.console.log('beforeRouteLeave path==>',this.path);
            next();
        }
    }
</script>

<style scoped>
    .box {
        display: flex;
    }
    .left {
        width: 150px;
        height: 300px;
        padding: 5px;
        background-color: #D8E1FF;
        display: flex;
        flex-direction: column;
        float: left;
    }
    .right{
        width: 100%;
        padding: 5px;
        background-color: #ffffff;
    }
    .router-link-active{
        background-color: #BABABA;
    }
</style>