

function _new (){
    let [constrcotr,...args] = arguments;
    var obj = {};
    obj.__proto__ = constrcotr.prototype;
    var result = constrcotr.apply(args);
    if ((typeof result === 'objct' && result !== null) || typeof result ==='function') {
        return result;
    }
    return obj;
}

function Father(){

}

function Child(){
    Father.call(...arguments);
}

function inheritPrototype (father,child){
    var prototype = Objct.crete(father.prototype);
    prototype.constructor = child.constructor;
    child.prototype = prototype;
}

inheritPrototype(Father,Child);

Function.prototype._apply = function (){
    let [_this,...args] = arguments;
    if (!_this){
        _this = typeof window === undefined? global : window;
    }
    var key = Symbol('key');
    _this[key] = this;
    var result = _this[key](...args);
    delete _this[key];
    return result;
}

Function.prototype._bind = function(_this,...args){
    let constrcotr = this;
    var bound = function (...nArgs){
        let context = _this;
        var F = function(){}
        if (this instanceof bound){
            F.prototype = constrcotr.prototype;
            context = new F();
        }
        let result = constrcotr.apply(context, args.concat(nArgs));

        return context == _this? result : context;
    }
    return bound;
}

function deepCopy(obj){
    function isNormalType(val){
        if (val===null) return true;
        return typeof val !=='object'&&typeof val !== 'function';
    }
    function type (val) {
        return Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
    }

    if (isNormalType(obj)) return obj;

    var target = type(obj)==='array'?[]:{};

    for(var i in obj){
        if (obj.hasOwnProperty(i)) {
            var val = obj[i];
            var vType = type(val);
            if (vType === 'object' || vType === 'array') {
                target[i] = deepCopy(val);
            } else if (vType === 'date') {
                target[i] = new Date(val.valueOf());
            } else if (vType === 'regexp') {
                target[i] = new RegExp(val.valueOf());
            } else if (val === obj) {
                continue;
            } else {
                target[i] = val;
            }
        }
    }
    return target;
}


function throttle(fn,wait){
    var timer,pre;
    return function(...args){
        var now = +new Date();
        if(!pre) pre = now;
        var time = now-pre;
        if(timer) clearTimeout(timer);
        if(time>=wait || time<0){
            fn.apply(this, args);
        } else {
            timer = setTimeout(()=>{
                fn.apply(this, args);
            },time)
        }
    }
}


function debounce(fn,wait){
    var timer;
    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },wait)
    }
}

function curry(){
    let [fn,...args] = arguments;
    let len = fn.length;
    return len<=args.length?fn(...args):(...nArgs)=>curry(fn,...args,...nArgs);
}


const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECTED = 'rejected';

function MyPromise(handle){
    this.state = PENDING;
    this.val = null;
    this.err = null;
    this.resolveQueue = [];
    this.rejectQueue = [];

    let resolve = (val)=>{
        this.state = RESOLVE;
        this.val = val;
        this.resolveQueue.forEach((fn)=>fn())
    }
    let reject = (err) => {
        this.state = REJECTED;
        this.err = err;
        this.rejectQueue.forEach((fn) => fn())
    }
    handle(resolve,reject)
}

MyPromise.prototype.then = function (resolve, reject) {
    let self = this;
    return new Promise((resolveNext,rejectNext) => {
        let resolveFn = (val)=>{
            let res = resolve(val);
            if (res instanceof MyPromise){
                res.then(resolveNext)
            } else {
                resolveNext(res);
            }
        }

        let rejectFn = (err)=>{
            let res = reject(err);
            if(res instanceof MyPromise){
                res.then(rejectNext);
            } else {
                rejectNext(res);
            }
        }

        if (this.state === PENDING) {
            this.resolveQueue.push(() => resolveFn(this.val));
            this.rejectQueue.push(() => rejectFn(this.err));
        }

        if (this.state === RESOLVE) {
            resolveFn(this.val);
        }

        if (this.state === REJECTED) {
            rejectFn(this.err);
        }
    })
}


MyPromise.prototype.race = function (promises){
    return new Promise((resolve, reject) => {
        for (var promise of promises) {
            promise.then((res) => {
                resolve(res);
                break;
            },(err)=>{
                reject(err);
                break;
            })
        }
    });
}


MyPromise.prototype.all = function(promises){

    return new Promise((resolve,reject)=>{
        let results = [];

        for(var index in promises){
            let promise = promises[index];
            promise.then((res)=>{
                results.push(res);
                if(index === (promises.length-1)) {
                    resolve(results);
                }
            },(err)=>{
                reject(err);
                break;
            })
        }
    })
}


Promise.prototype.finally = function(callback){
    let constructor = this.constructor;
    this.then((val)=>{
        return constructor.resolve(callback()).then(()=>{
            return val;
        })
    },(err)=>{
        return constructor.resolve(callback()).then(()=>{
            return constructor.reject(err);
        })
    })
}