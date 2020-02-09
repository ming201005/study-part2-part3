import {ADDITION, SUBSTRACTION} from "./MutationType";

export default {
    //函数参数化
    [ADDITION](state){
        state.count ++;
    },
    [SUBSTRACTION](state){
        state.count --;
    },
    //更多操作
    //提交风格：payload
    optionMore(state,num){
        console.log('更多操作==>',state,num);
        state.count += Number(num);
        // Vue.set(state.user,'name',options.user.name)
    },
    //更新用户信息
    setUserInfos(state,id) {
        //如果在state存在
        if (state.user.id == id) {
            state.user = {id:5,name:'李四'};
            console.log("数据改成：",state.user);
        }
    }
}