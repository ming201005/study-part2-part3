<template>
    <div>
        <h3>MyCpn</h3>
        <div>id===>{{this.$route.query.id}}</div>
        <div class="content">MyCpn的内容</div>
    </div>
</template>

<script>
    export default {
        name: "MyCpn",
        data(){
            return{

            }
        },
        created() {

        },
    }
</script>
<style scoped>
    .content{
        margin :5px 2px;
        padding: 3px;
        border-top: #928BA9;
    }
</style>