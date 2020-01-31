/**
 * 有参数函数 
 * 第三个参数作为函数传入
 */
function myfun01(userName,type,funCall) {
    var mData = null;
    if(type===1) {
        //到数据库查xxx钱
        mData = [
            {
                yanghang:"建设银行",
                mn:"50",
                des:"投资"
            },
            {
                yanghang:"招商银行",
                mn:"120",
                des:"养老钱"
            }];
    }else{
         //到数据库查xxx钱
         mData = [
            {
                yanghang:"花旗银行",
                mn:"250",
                des:"旅游用的"
            },
            {
                yanghang:"招商银行",
                mn:"320",
                des:"养老钱"
            },
            {
                yanghang:"农业银行",
                mn:"300",
                des:"其他用途"
            }
        ];
    }

    funCall(mData);
}

/**
 * 无参数函数 
 */
function checkName(name) {

    var studyList = [
        {
          name:"语文",
          fenshu:120
        },
        {
          name:"数学",
          fenshu:130
        },
        {
          name:"英语",
          fenshu:56
        }
    ];
    var obj = {
        id:"001",
        name:"张三",
        study:studyList
    }
    return  obj.name===name;
}


