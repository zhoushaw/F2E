
//1.原型：
//a.所有引用类型都有__proto__属性，这个属性值是一个普通对象
//b.所有函数都有prototype属性，这个属性指向一个普通对象
//所有引用类型的__proto__属性指向它构造函数的原型


// 2.原型链：当访问对象某个属性时，如果不存在将会通过对象的__proto__
// 属性找到创建这个对象的构造函数的原型，如果原型上也不出存在这
// 个属性会通过原型上的__proto__属性找原型上的原型，这样一层层向上查找的链接称之为原型链

function Father() {}
function Child() {}

Child.prototype = new Father();
Child.prototype.construcotr = Child;
var child1 = new Child();
/**
    child1.__proto__=>Child.prototype
    Child.prototype.constructor => Child
    Child.prototype.__proto__=>Father.prototype
    Father.prototype.__proto__=>Object.prototype
    Father.__proto__ =>Function.prototype
    Function.prototype.__proto__=>Object.prototype
    Object.prototype.__proto__=>Function.protoype
*/

console.log(Object.__proto__===Function.prototype,Function.prototype.__proto__===Object.prototype)