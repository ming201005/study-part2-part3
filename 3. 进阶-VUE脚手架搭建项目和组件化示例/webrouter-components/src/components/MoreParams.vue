<template>
    <div>
        <h2>动态路径多个参数传值</h2>
        <hr>
        <!--/more/:type/:name/:id-->
        <div>参数1：{{this.$route.params.type}}</div>
        <div>参数2：{{this.$route.params.name}}</div>
        <div>参数3：{{this.$route.params.id}}</div>
    </div>
</template>

<script>
    export default {
        name: "MoreParams"
    }
</script>

<style scoped>

</style>