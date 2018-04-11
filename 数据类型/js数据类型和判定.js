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
 */

var str = Symbol();
console.log(Object.prototype.toString.call(str));