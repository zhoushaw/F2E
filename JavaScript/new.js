/**
    1.new 一个对象的过程：

    a.创建一个空对象，将这个空对象的__proto__属性指向这个构造函数的原型上
    b.将空对象作为构造函数的this，并运行
    c.如果构造函数的返回结果为对象或函数，将返回结果作为new的结果
    d.如果不为对象、函数，将原空对象作为结果返回
 */

function _new () {
    var target = {};
    var [_constructor,...args] = arguments;
    target.__proto__ = _constructor.prototype;
    var result = _constructor.apply(target,args);

    if((typeof result === 'object' || typeof result === 'function') && result!==null ) {
        return result;
    }

    return target;
}