
var obj = {};
obj.id   = "003";
obj.name = "王大爷";
obj.sex  = "男";
obj.run  = function(){
    var num = 5;
    if(this.sex=="男") {
        num = 10;
    }
    console.log("大家好，我叫["+this.name+"]我是一个【"+this.sex+"】,一天跑"+num+"公里");
}