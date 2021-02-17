"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Human = /** @class */ (function () {
    function Human(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    return Human;
}());
var person = new Human("mori", 8);
var sayHi = function (obj) {
    console.log("hello, my name is " + obj.name + ", i am a " + obj.age + " and i am " + obj.gender);
};
sayHi(person);
//# sourceMappingURL=index.js.map