

// 实现bind，功能如下
// 1.通过bind函数指定作用域会返回一个函数
// 2.这个函数如果被普通调用，定义时传入的参数和调用时传入的参数都会传递给定义时的函数
// 3.可以将函数指向对应的this
// 4.如果是new方式调用，this指向生成的对象上


// Function.prototype._bind = function(_this,...args){
//     let constructor = this;
//     var bound = function(...nArgs){
//         let context = _this;
//         if (this instanceof bound){
//             var F = function(){};
//             F.prototype = constructor.prototype;
//             contenxt = new F();
//         }
//         let result = constructor.apply(context,args.concat(nArgs));
//         return context == _this? result: context;
//     }
//     return bound;
// }


Function.prototype._bind = function(){
    let [_this,...args] = arguments;
    let construcotr = this;
    var F = function(){}
    var bound = function(...nArgs){
        let context = _this;
        if (this instanceof bound) {
            F.prototype = construcotr.prototype;
            context = new F();
        }
        let result = construcotr.apply(context,args.concat(nArgs));
        return _this==context ? result: context;
    }
    return bound;
}


