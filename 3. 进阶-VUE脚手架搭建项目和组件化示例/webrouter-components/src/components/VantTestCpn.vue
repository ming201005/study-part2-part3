<template>
    <div>
        <hr/>
        <van-card
                num="2"
                tag="标签"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                origin-price="10.00"/>
        <hr/>
        <van-submit-bar
                :price="3050"
                button-text="提交订单"
                @submit="onSubmit"
        >
            <van-checkbox v-model="checked">全选</van-checkbox>
            <span slot="tip">
    你的收货地址不支持同城送, <span>修改地址</span>
  </span>
        </van-submit-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Card,SubmitBar,Checkbox} from 'vant';

    Vue.use(Card)
        .use(SubmitBar)
        .use(Checkbox);

    export default {
        name: "VantTestCpn",
        data() {
            return {
                checked: true,
                chosenContactId: null,
                editingContact: {},
                showList: false,
                showEdit: false,
                isEdit: false,
                list: [{
                    name: '张三',
                    tel: '13000000000',
                    id: 0
                }]
            };
        },
        props: ["id"],
        created() {
            window.console.log("props sssss==>",this.id);
        },
        computed: {
            cardType() {
                return this.chosenContactId !== null ? 'edit' : 'add';
            },

            currentContact() {
                const id = this.chosenContactId;
                return id !== null ? this.list.filter(item => item.id === id)[0] : {};
            }
        },

        methods: {
            // 添加联系人
            onSubmit() {

            }
        }
    }
</script>

<style scoped>

</style>