/**
 * user class
 * @type {User}
 */
export default class User {

    constructor(id='01',name="ming206",age=23) {
        this._id   = id;
        this._name = name;
        this._age  = age;
    }

    info() {
        return `${this.id},${this.name},${this.age}`;
    }

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
