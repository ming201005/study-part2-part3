<template>
    <div>
        <div>--参军报名填写表--</div>
        <div>编号：<input v-model="user.id"></div>
        <div>姓名：<input v-model="user.name"></div>
        <div>年龄：<input v-model="user.age"></div>
        <div>身高：<input v-model="user.height"></div>
    </div>
</template>

<script>
    export default {
        name: "NewsArmy",
        data(){
            return{
                user: {
                    id:'',
                    name: '',
                    age :'',
                    height:''
                }
            }
        }
    }
</script>

<style scoped>

</style>