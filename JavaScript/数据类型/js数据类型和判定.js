/**
 *  数据类型：
 *  string、number、null、undefined、boolean、object、symbol
 *
 *
 *  typeof可以检测哪些数据类型：
 *  string、number、undefined、boolean、object、function、symbol
 *
 *
 *  判断是否数字类型：
 *  isNaN()是不是不是一个数字，当是数字是返回false
 *
 *  最准确的数据类型判断
 *  Object.prototype.toString.call(type)
 *  对应返回 [object String] [object Number] [object Null] [object Undefined] [object Function] [object Symbol]
 *
 *
 *  null和undefined区别
 *
 *  undefined 表示不存在这个值。
    undefined :是一个表示”无”的原始值或者说表示”缺少值”，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined
    例如变量被声明了，但没有赋值时，就等于undefined

    null 表示一个对象被定义了，值为“空值”

    null : 是一个对象(空对象, 没有任何属性和方法)
    例如作为函数的参数，表示该函数的参数不是对象；

    在验证null时，一定要使用　=== ，因为 ==无法分别null 和　undefined


    null==false 返回的是false
    null==true  返回的还是false
 */

var str = Symbol();
console.log(Object.prototype.toString.call(str));

console.log(null==false);



/**
 * 正确变量类型：null undefined string number boolean object
 */

let class2type = {};

"Undefined Null Number Boolean String Object".split(' ').forEach((key) => {
    class2type[`[object ${key}]`] = key.toLowerCase();
})

function type(value) {
    let key = Object.prototype.toString.call(value);
    return class2type[key];
}

console.log(type({}));