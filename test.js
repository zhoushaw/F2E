// const PENDING = 'pending';
// const FULFILLED = 'fulfilled';
// const REJECTED = 'rejected';

// function MyPromise(handle){
//     this.state = PENDING;
//     this.result = null;
//     this.err = null;
//     this.resolveQueue = [];
//     this.rejectQueue = [];

//     let resovle = (val)=>{
//     		this.state = FULFILLED;
//         this.result = val;
//         this.resolveQueue.forEach(fn=>fn())
//     }

//     let reject = (err)=>{
//     		this.state = REJECTED;
//         this.err = err;
//         this.rejectQueue.forEach(fn=>fn());
//     }

//     handle(resovle,reject);
// }

// MyPromise.prototype.then = function (resolve,reject){
//     // 状态在进行中时,结果尚未出来，订阅
//     if (this.state === PENDING ) {
//         resolve && this.resolveQueue.push(()=>resolve(this.result));
//         reject && this.resolveQueue.push(()=>reject(this.err));
//     }
    
//     // 结果已出直接执行
//     if (this.state === REJECTED ) {
//         reject(this.err);
//     }
    
//     if (this.state === FULFILLED ) {
//         resolve(this.result);
//     }
// }


// var promis = new MyPromise(function(resolve,reject) {
//     setTimeout(() => {
//         resolve(3);
//     }, 3000);
// })

// promis.then(res => {
//     console.log('hello world');
  
//     return 'wfe';
// })


// function _new() {
//     var [fn,...args] = arguments;
//     var target = {};
//     target.__proto__ = fn.prototype
//     var result = fn.apply(target,...args);
//     if ((typeof result === 'object' && result !== null) || typeof result ==='function') {
//         return result;
//     }

//     return target;
// }


// 闭包就是函数能够访问他的词法作用域，即使函数在它的词法作用域外执行

// this指向，1.new构造函数,this指向实例对象 2.硬绑定，apply、call指向绑定对象，如果为null，非严格模式指向window
// 3.隐式调用，基于对象上调用，指向调用点，4.默认绑定，指向全局window



// function deepCopy(obj) {
//     if (typeof obj !== 'object' || obj === null) {
//         return obj;
//     }

//     function isObj (obj) {
//         return Object.prototype.toString.call(obj) === '[object Object]'
//     }

//     var target = isObj(obj)?{}:[];
    
//     for (var i in obj) {
//         if (isObj(obj[i]) || Array.isArray(obj[i])){
//             target[i] = deepCopy(obj[i]);
//         } else {
//             target[i] = obj[i]
//         }
        
//     }

//     return target;
// }


// var a = {a:[],s:[{ss:'zhoushaw'}]}

// var b = deepCopy(a);

// b.s[0].ss = 'shaw'

// console.log(a,b)

// function throttle(fn,wait) {
//     var timer,previous;
//     return function() {
//         var now = +new Date();
//         if (!previous) previous = now;
//         if (timer) clearTimeout(timer)

//         var last = now-previous;
//         if (last>=wait || last<0) {
//             fn.apply(this,arguments)
//             previous = now;
//             clearTimeout(timer);
//         } else {
//             timer = setTimeout(() => {
//                 fn.apply(this,arguments);
//                 previous = now;
//                 clearTimeout(timer);
//             }, wait-last);
//         }

//     }
// }




