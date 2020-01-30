var obj = {};
//对象属性
obj.id = "003";
obj.name = "张三";
obj.sex = "男";

//声明run方法
obj.run = function(){
    var num = 5;
    if(this.sex=="男") num = 10;
    console.log("大家好，我叫["+this.name
        +"]，性别是【"+this.sex+"】,我一天可以跑"+num+"公里");
}