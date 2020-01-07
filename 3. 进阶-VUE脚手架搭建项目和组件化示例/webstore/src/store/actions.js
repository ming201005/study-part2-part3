export  default {
    setUserInfos(context,id){
        return new Promise((resolve,reject)=>{
            //发送请求，修改数据库的数据
            setTimeout(function () {
                //假设：正在修改远端数据库信息
                //..........
                //修改完毕。
                context.commit('setUserInfos',id);
                let msg  = '修改数据完毕！';
                let user = context.state.user;
                resolve({user,msg});
            },1500);
        });
    }
}