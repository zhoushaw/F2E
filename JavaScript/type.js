/**
1.基础类型
    null、undefined、number、boolean、string、Symbol、Object

2.判断类型
    typeof 检测值：undefined、string、number、boolean、Object、Function、Symbol
*/


function type (val) {
    return typeof val !== 'object'? typeof val : Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
}