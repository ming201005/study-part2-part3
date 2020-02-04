<template>
    <div>
        <h3>8.路由传递参数—类似“?”传参</h3>
        <div class="box">接收到的参数={{this.$route.query.id}}</div>
    </div>
</template>

<script>
    export default {
        name: "10.8.Params"
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