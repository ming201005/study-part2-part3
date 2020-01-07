<template>
    <div class="box">
        <div class="title">---首页信息---</div>
        <div>{{this.$route.query.id}}</div>

        <div class="content">这里是首页的内容。。。。</div>

    </div>
</template>

<script>
    export default {
        name: "MyCpn",
        props: {
            id :Number
        },
        data(){
            return{

            }
        },
        created() {
            this.log("props==>",this.id);
        },
    }
</script>

<style scoped>
    .box{
        margin: 5px;
        width: 95%;
        height: 200px;
        background-color: #E0E2ED;
        border-style: solid;
        border-color: #E0E2ED;
        border-width: 1px;
        box-shadow: 2px 2px 2px 2px  #928BA9;
    }
    .box .title{
        padding: 2px 8px;
        background-color: darkgrey;
    }
    .box .content{
        margin :5px 2px;
        padding: 3px;
        border-top: #928BA9;
    }
</style>