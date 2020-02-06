<template>
    <div id="app">
        <div class="nav">
            <router-link to="/">首页</router-link>
            <router-link to="/hello">欢迎页</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'app',

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
