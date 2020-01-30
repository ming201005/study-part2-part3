/**
 * 会员对象
 */
function Member() {
    this.id;
    this.name;
    this.age;
    this.tell;

    /**
     * 初始化
     */
    this.init = function (id,name,age,tell){
        this.id = id;
        this.name = name;
        this.age = age;
        this.tell = tell;
    };

    /**
     * 方法1
     */
    this.call = function() {
        console.log("我叫："+this.name);
    };

    /**
     * 方法2
     */
    this.dom = function (str) {

    }
}