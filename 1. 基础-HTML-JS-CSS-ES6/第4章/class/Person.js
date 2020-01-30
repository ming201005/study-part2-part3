/**
 * 也必将常用，是一种类似json格式的对象定义写法。
 * 人对象类
 */
var Person =
    {
        //属性
        id:null,
        name:null,
        sex:null,
        Tell:{
            type:"中国移动",
            number:"1881682011",
            other:"des",
            //定义方法
            call:function() {
                console.log(Person.name
                    +"的"+this.type+"电话号码（"
                    +this.number+"）"+"每月拨打电话200多次！");
            }
        },
        //初始化
        init:function(id, name, sex) {
            this.id = id;
            this.name = name;
            this.sex = sex||"男";
        },
        /**
         * 跑步
         */
        run:function(){
            var num = 5;
            if(this.sex=="男") {
                num = 10;
            }
            console.log("大家好，我叫["+this.name+"]我是一个【"
                +this.sex+"】,一天跑"+num+"公里");
        },
        /**
         * 购买物品
         */
        shop:function(){
            console.log("每个季度购买5套衣服")
        }
    }
