/**
 * 定义User对象。
 * @param name 姓名
 * @param sex  性别
 * @param age  年龄
 * @constructor
 */
function User(name,sex,age){
    this.name = name;
    this.sex  = sex;
    this.age  = age;
    /**
     * 输出用户身份信息
     */
    this.display = function() {
        console.log(`My name is ${this.name},
                     sex is ${this.sex||"保密"},
                     age is ${this.age||"不知道"}
                     `);
    }
    //其他方法
}

/**
 * 显示用户姓名
 * 用混合模式prototype定义showName方法。
 */
User.prototype.showName = function(){
    console.log("prototype showName 我:"+this.name);
}
