/**
 * user class
 * @type {User}
 */
export default class User {


    _id = '01';
    _name = 'ming206';
    _age = 35;

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
