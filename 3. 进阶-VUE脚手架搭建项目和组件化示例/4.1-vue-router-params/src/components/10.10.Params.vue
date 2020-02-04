<template>
    <div>
        <h3>10.路由传递参数—类似表单提交传参</h3>
        <div class="box">
            接收到的参数如下：
            <hr>
            <li> id={{this.$route.params.id}}</li>
            <li> msg= {{this.$route.params.msg}}</li>
        </div>
    </div>
</template>

<script>
    export default {
        name: "10.10.Params"
    }
</script>
<style scoped>
    .box{
        width: 300px;
        height: 120px;
        font-size: 20px;
        background-color: #D8E1FF;
    }
</style>