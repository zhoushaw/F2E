/**
* 1.函数柯里化是把接收多个参数的函数转换成接收单个参数的函数
* 2.并且返回接受剩余参数而且返回结果的新函数的技术
* */


function curry(fn,...args){
    return fn.length>args.length?(...nArgs)=>curry(fn,...args,...nArgs):fn(...args);
}

function add(a,b,c) {
    return a+b+c;
}

var newAdd = curry(add);
console.log(newAdd(1)(2)(3));


