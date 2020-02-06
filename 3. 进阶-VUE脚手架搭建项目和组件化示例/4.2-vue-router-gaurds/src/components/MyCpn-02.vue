<template>
    <div>
        <h3>MyCpn-02</h3>
         <div class="content">
             <h4>接收到参数：</h4>
             <div>user = {{$route.params.user}}</div>
             <div> type = {{$route.params.type}}</div>
         </div>
    </div>
</template>

<script>
    export default {
        name: "MyCpn-02",
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