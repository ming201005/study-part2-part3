<template>
    <div>
        <h2>CodeTestCpn组件</h2>
        <hr>
        <div>{{this.$route.query}}</div>
        <hr>子组件跳转（嵌套路由）：
        <div class="box">
            <div class="left">
                <router-link :to="{name:'c1'}">子组件1</router-link>
                <router-link :to="{name:'c2'}">子组件2</router-link>
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
        name: "CodeTestCpn",
    }
</script>

<style scoped>
    .box{
        display: flex;
    }
    .box .left{
        width: 150px;
        height: 300px;
        background-color: #D8E1FF;
        display: flex;
        flex-direction: column;
    }
    .box .left >a{

    }
    .box .right{
        width: auto;
        height: 300px;

    }
</style>