<template>
    <div class="box">
        <h3>状态操作组件</h3>
        <hr>
        <div class="box-item">
            <div>1-加减法</div>
            <button @click="add">加法</button>
            <button @click="sub">减法</button>
        </div>
        <div class="box-item">
            <div>2-带参数操作</div>
            <button @click="optionMore(5)">加5</button>
            <button @click="optionMore(8)">加8</button>
        </div>
        <div class="box-item">
            <div>3-有异步操作</div>
            <button @click="setUser">设置数据</button>
        </div>
        <div class="box-item">
            <div>4-划分模块</div>
            <button @click="setMsg">点我一下</button>
        </div>

    </div>
</template>

<script>
    import {ADDITION, SUBSTRACTION} from '../store/MutationType';

    export default {
        name: 'Options',
        data() {
            return {}
        },
        methods: {

            // 加法
            add() {
                this.$store.commit(ADDITION);
            },

            //减法
            sub() {
                this.$store.commit(SUBSTRACTION);
            },
            //
            optionMore(num) {
                this.$store.commit('optionMore', num);
            },
            //
            setUser() {
                this.$store.dispatch("setUserInfos", 1).then(data => {
                    console.log(data);
                }).catch(error => {
                    console.log(error);
                });
            },
            setMsg() {
                this.$store.commit("setMsg", "你好，我是战士！");
            }
        }
    }
</script>
<style scoped>
    .box {
        padding: 5px;
        width: 200px;
        box-shadow: 2px 2px 2px 2px #BABABA;
    }
    .box-item >div{
        font-size: 15px;
        font-weight: bold;
        margin: 5px 3px;
    }
    .box-item >button{
        margin: 0 5px;
    }
</style>