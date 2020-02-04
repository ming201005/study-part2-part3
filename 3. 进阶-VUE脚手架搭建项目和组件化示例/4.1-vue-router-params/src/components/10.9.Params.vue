<template>
    <div>
        <h3>9.路由传递参数—动态路径“如：user/1”传参</h3>
        <div class="box">接收到的参数={{this.$route.params.id}}</div>
    </div>
</template>

<script>
    export default {
        name: "10.9.Params"
    }
</script>
<style scoped>
    .box{
        width: 300px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        font-size: 20px;
        background-color: #D8E1FF;
    }
</style>