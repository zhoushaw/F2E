Function.prototype._call = function (){
    var [_this,...args] = arguments;
    if (!_this) {
        _this = typeof window === undefined ? global : window;
    }
    var func = Symbol('func');
    _this[func] = this;
    var result = _this[func](...args);

    return result;
}


var a = {name: 'zhoushaw'};

var name = 'zhou';
var sayName = function (){
    console.log(this.name,this)
}

sayName();
sayName._call(a)