<template>
    <div>
        <span><input v-model="num"></span>
        <span><button @click="add">加法</button></span>
        <hr>
        <h3>store中的count值：</h3>
        <div>{{this.$store.state.count}}</div>
    </div>
</template>

<script>
    export default {
        name: "do-optionMore",
        data(){
            return {
                num:0
            }
        },
        methods:{
            add(){
                this.$store.commit('optionMore',this.num);
            }
        }
    }
</script>

<style scoped>

</style>