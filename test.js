
// Function.prototype._bind = function(that,...args){
//     let constructor = this;
//     let bound = function(...nArgs){
//         return constructor.call(this instanceof bound?constructor:that,...args,...nArgs);
//     }
//     if(this.prototype){
//         bound.prototype = Object.create(this.prototype);
//     }
//     return bound;
// }

// Function.prototype._apply = function(that,args){
//     if(!that){
//         that = typeof window === 'undefined'?global:window;
//     }
//     var key = Symbol('key');
//     that[key] = this;
//     var res = that[key](...args);
//     delete that[key];
//     return res;
// }


// function _new(constructor,...args){
//     var F = {};
//     F.__proto__ = constructor.prototype;
//     var res = constructor.apply(F,...args);
//     if(typeof res==='object'&&res!==null || typeof res ==='function' ){
//         return res;
//     }
//     return F;
// }



// let MyPromise = (()=>{
//     const PENDING = 'pending';
//     const RESOLVE = 'resolve';
//     const REJECT = 'reject';
//     function MyPromise(handle){
//         this.state = PENDING;
//         this.val = null;
//         this.err = null;
//         this.resolveList = [];
//         this.rejectList = [];
//         let resolve = (val)=>{
//             this.val = val;
//             this.resolveList.forEach(fn=>fn());
//         }
//         let reject = (err) => {
//             this.err = err;
//             this.rejectList.forEach(fn => fn());
//         }
//         handle(resolve,reject)
//     }

//     MyPromise.prototype.then = function(resolve,reject){
//         let that = this;
//         return new MyPromise((resolveNext,rejectNext) => {
//             let resolveFn = (val)=>{
//                 let res = resolve(val);
//                 if( res instanceof MyPromise){
//                     res.then(resolveNext,rejectNext);
//                 } else {
//                     resolveNext(res);
//                 }
//             }

//             let rejectFn = (err) => {
//                 let res = resolve(err);
//                 if (res instanceof MyPromise) {
//                     res.then(resolveNext, rejectNext);
//                 } else {
//                     rejectNext(res);
//                 }
//             }

//             if (that.state === PENDING) {
//                 that.resolveList.push(() => {
//                     resolveFn(that.val);
//                 })
//                 that.rejectList.push(() => {
//                     rejectFn(that.err);
//                 });
//             }

//             if (that.state === RESOLVE) {
//                 resolveFn(that.val);
//             }

//             if (that.state === REJECT) {
//                 rejectFn(that.err);
//             }
//         })
//     }

//     MyPromise.all = function (promises) {
//         return MyPromise((resolve, reject) => {
//             let result = [];
//             var index = 0;
//             for (var i = 0; i < promises.length; i++) {
//                 promises[i].then((res) => {
//                     result.push(res);
//                     index++;
//                     if (index === promises.length) {
//                         resolve(result);
//                     }
//                 }, (err) => {
//                     reject(err);
//                 })
//             }
//         })
//     }

//     MyPromise.race = function (promises) {
//         return MyPromise((resolve, reject) => {
//             for (var i = 0; i < promises.length; i++) {
//                 promises[i].then((res) => {
//                     resolve(res);
//                 }, (err) => {
//                     reject(err);
//                 })
//             }
//         })
//     }

//     MyPromise.limit = function (promises,limit) {
//         return new MyPromise((resolve,reject)=>{
//             let len = promises.length;
//             let result = [];
//             function run(p){
//                 p().then((res)=>{
//                     if(result.length<len){
//                         result.push(res);
//                         run(promises.shift())
//                     } else {
//                         resolve(result);''
//                     }
//                 },(err)=>{
//                         reject(err);
//                 })
//             }
//             promises.slice(0,limit+1).forEach((p)=>{
//                 run(p);
//             })
//         })
//     }
//     return MyPromise;
// })()


// let promise = new MyPromise((resolve) => {
//     setTimeout(() => {
//         resolve('zz')
//     }, 2000)
// });

// let promise1 = new MyPromise((resolve) => {
//     setTimeout(() => {
//         resolve('zuogeren')
//     }, 1000)
// });

// promise.then((res) => {
//     console.log(res);
// })
// promise1.then((res) => {
//     console.log(res);
// })



// function deepCopy(obj){
//     var map = new WeakMap();
//     function dp(obj){
//         function isNormalType(val){
//             return typeof val !== 'object' || val===null ||typeof val ==='function';
//         }
//         function getType(val){
//             return Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
//         }
//         if(isNormalType(obj)) return obj;
//         var Vtype = getType(obj);
//         function getRegExpN (val) {
//             let nVal = val.valueOf();
//             let flag = '';
//             flag += val.ignore?'i':'';
//             flag += val.global?'g':'';
//             return new RegExp(nVal,flag);
//         }
//         function getDateN(val){
//             return new Date(val.valueOf());
//         }
//         if (Vtype === 'regexp') return getRegExpN(obj);
//         if(Vtype === 'date') return getDateN(obj);

//         let existObj = map.get(obj);
//         if (existObj) return existObj;

//         var target = Vtype==='array'?[]:{};
//         map.set(obj,target);

//         for(var i in obj){
//             let typeV = getType(obj[i])
//             if(isNormalType(obj[i])){
//                 target[i] = obj[i];
//             } else if (typeV==='date'){
//                 target[i] = getDateN(obj[i]);
//             } else if (typeV === 'regexp') {
//                 target[i] = getRegExpN(obj[i]);
//             } else {
//                 target[i] = dp(obj[i]);
//             }
//         }
//         return target;
//     }
//     return dp(obj);
// }



// var a = { v: [{ name: 'zhou' }], ss: { name: ['wfe'] }, s: a, d: new Date() }
// var b = deepCopy(a);
// b.ss.name[1] = 'zhoushaw';
// b.v[0].name = 'chang';
// console.log(a, b)


// function* helloWorldGenerator() {
//     yield function(){return 'hello'};
//     yield 'world';
//     return 'ending';
// }

// var hw = helloWorldGenerator();

// console.log(hw.next(), hw.next())


// function add (n){
//     var val = n;
//     var bound = function(nVal){
//         val = val + nVal;
//         return bound;
//     };

//     var b = new Proxy(bound,{
//         get(target, propKey, receiver){
//             Reflect.get(target, propKey, receiver)
//         }
//     })

//     return b;
// }

// add(1)(2)(3).val;

// function add (n){
//     let val = n;
//     let bound = function(nVal){
//         val = val+nVal;
//         return proxyBound(bound);
//     }

//     function proxyBound(fn) {
//         let p = new Proxy(fn, {
//             get(target, key, receiver) {
//                 if (key === 'val') {
//                     return val;
//                 }
//                 return Reflect.get(target, key, receiver);
//             }
//         })
//         return p;
//     }
//     return proxyBound(bound);
// }

// function add (n){
//     let val = n;
//     let bound = function(nVal){
//         val += nVal;
//         return bound;
//     }
//     Object.defineProperty(bound,'val',{
//         get () {
//             return val;
//         }
//     })
//     return bound;
// }

// console.log(add(1)(2)(3).val);
// console.log(add(1)(2).val);

// var arr = ['1','1','1','2','3','3','4','5','6'];


// function uniqueArr(arr){
//     let slowerIndex = 0;
//     let quickIndex = 1;
//     while(quickIndex<arr.length){
//         if(arr[slowerIndex]===arr[quickIndex]){
//             quickIndex++;
//         } else {
//             slowerIndex++;
//             arr[slowerIndex] = arr[quickIndex];
//             quickIndex++;
//         }
//     }
//     return arr.splice(0,slowerIndex+1);
// }

// console.log(uniqueArr(arr));


// var removeElement = function (nums, val) {
//     let index = 0;
//     let len = nums.length - 1;
//     while (index <= len) {
//         console.log(nums, nums[index],val);
//         if (nums[index] === val) {
//             nums.splice(index, 1);
//             len--;
//         } else {
//             index++;
//         }
//     }
//     return nums;
// };
// console.log(removeElement([3, 2, 2, 3], 3))



// function a() {
//     setTimeout(()=>{
//         console.log('timer');
//         a();
//     });
//     process.nextTick(() => {
//         console.log('nextTick');
//         a();
//     });
// }

// a();


setTimeout(() => {
    console.log('timer');
});
process.nextTick(() => {
    console.log('nextTick');
});