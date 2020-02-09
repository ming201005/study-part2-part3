<template>
    <div id="app">
        <div class="nav">
            <router-link to="/index">首页</router-link>
            <router-link to="/news">新闻</router-link>
        </div>
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>
    .nav a{
        margin: 2px 5px;
    }
</style>