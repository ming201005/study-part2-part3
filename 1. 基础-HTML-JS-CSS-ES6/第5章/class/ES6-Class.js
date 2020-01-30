/**
 * 爷爷
 */
class GrandFather {
    /**
     * 构造函数
     * @param id
     * @param name
     * @param age
     */
    constructor(id,name,age) {
        this._id = id;
        this._name = name;
        this._age = age;
    }

    /**
     * 跑步行为
     */
    run(){
        console.log(`他跑步是世界冠军，速度是：11秒/100米`);
    }

    /**
     * 信息输出
     */
    info(){
        console.log(`档案=》
                     编号：${this.id},
                     姓名：${this.name},
                     ${this.age}岁。`);
    }

    //--GET / SET (在webStorm中可以快速生成)
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }
}

/**
 * 爸爸 继承爷爷
 */
class Father extends GrandFather {

    constructor(id,name,age,...other) {
        super(id,name,age);
        this._other = other;
    }

    /**
     * 重写父类方法（多态）
     */
    run(){
        console.log(`噢，遗憾！没继承爷爷的运动天赋，不会跑步！`);
    }


    get other() {
        return this._other;
    }

    set other(value) {
        this._other = value;
    }
}

/**
 * 孩子
 */
class Child extends Father {

    //静态变量定义，可以直接用Child.ID_CARD访问
    static ID_CARD = "558899edg";

    /**
     * 覆盖方法
     */
    info() {
        console.log(super.id,super.name,super.age,super.other);

    }

    /**
     * 静态方法定义
     */
    static test() {

    }

    /**
     * 私有方法的定义， 用 "_XXX"定义
     * 静态方法和外部是不能访问的，只有内部
     * 其他非static修饰的方法可以访问。
     * @private
     */
    _myPrivateFun(){

    }
}