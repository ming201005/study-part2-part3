<template>
    <div>
        <h3>MyCpn-03</h3>
         <div class="content">
             <h4>接收到动态参数：</h4>
             <div> type = {{$route.params.type}}</div>
             <div> id = {{$route.params.id}}</div>
             <div> name = {{$route.params.name}}</div>
         </div>
    </div>
</template>

<script>
    export default {
        name: "MyCpn-03",
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