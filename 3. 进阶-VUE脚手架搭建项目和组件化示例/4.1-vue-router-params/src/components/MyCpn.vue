<template>
    <div>
        <h3>MyCpn</h3>
        <div>{{this.$route.query.id}}</div>
        <div class="content">MyCpn的内容</div>
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
    .content{
        margin :5px 2px;
        padding: 3px;
        border-top: #928BA9;
    }
</style>