<template>
    <div>
        <h3>12.路由传递参数—传递多个参数</h3>
        <div class="box">
            接收到的参数如下：
            <hr>
            <li> id={{this.$route.query.id}}</li>
            <li> msg= {{this.$route.query.msg}}</li>
            <hr>
            <li> id={{this.$route.params.id}}</li>
            <li> msg= {{this.$route.params.msg}}</li>
        </div>
    </div>
</template>

<script>
    export default {
        name: "10.12.Params"
    }
</script>
<style scoped>
    .box{
        width: 300px;
        height: 300px;
        font-size: 20px;
        background-color: #D8E1FF;
    }
</style>