

// Promise.prototype.all = function (promise) {
//     var result = [];
//     var i = 0;
//     return new Promise((resolve,reject) => {
//         for(var index in promise) {
//             i++;
//             promise.then((res) => {
//                 result.push(res);
//                 if (i===(promise.length-1)) resolve(result);
//             },(err)=>{
//                 reject(err);
//                 break;
//             })
//         }
//     })
// }
// Promise.prototype.race = function (promise) {
//     var result = [];
//     var i = 0;
//     return new Promise((resolve,reject) => {
//         for(var index in promise) {
//             i++;
//             promise.then((res) => {
//                 resolve(result);
//                 break;
//             },(err)=>{
//                 reject(err);
//                 break;
//             })
//         }
//     })
// }

// var promise1 = new Promise(function(resolve,reject){
//     setTimeout(() => {
//         resolve(1);
//     }, 2000);
// })
// var promise2 = new Promise(function(resolve,reject){
//     setTimeout(() => {
//         resolve(2);
//     }, 500);
// })
// var promise3 = new Promise(function(resolve,reject){
//     setTimeout(() => {
//         resolve(3);
//     }, 1000);
// })

// Promise.all([promise1,promise2,promise3]).then(res=>{
//     console.log(res)
// })
// Promise.race([promise1,promise2,promise3]).then(res=>{
//     console.log(res)
// })


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(handle){
    this.status = PENDING;
    this.result = null;
    this.err = null;
    this.resolveQueue = [];
    this.rejectQueue = [];

    let resovle = (val)=>{
        this.result = val;
        this.resolveQueue.forEach(fn=>fn())
    }

    let reject = (err)=>{
        this.err = err;
        this.rejectQueue.forEach(fn=>fn());
    }

    handle(resovle,reject);
}

MyPromise.prototype.then = function (resolve,reject){
    var self = this;
    return new MyPromise(function(resolveNext,rejectNext) {
        let resolvFn = (val)=>{
            let res = resolve(val);
            if (res instanceof MyPromise) {
                res.then(resolveNext,rejectNext);
            } else {
                resolveNext(res);
            }
        }
        let rejectFn = (err)=>{
            let res = reject(err);
            if (res instanceof MyPromise) {
                res.then(resolveNext,rejectNext);
            } else {
                rejectNext(res);
            }
        }

        if (self.status === PENDING) {
            self.resolveQueue.push(() => {resolvFn(self.result)});
            self.rejectQueue.push(() => {rejectFn(self.err)});
        }
        if (self.status === FULFILLED) {
            resolvFn(self.result);
        }
        if (self.status === REJECTED) {
            rejectFn(self.err);
        }
    });
}

MyPromise.prototype.all = function(promises){
    var resList = [];
    for(var i=0;i<promises.length;i++){
        promises[i].then((res)=>{
            resList.push(res);
            if(resList.length===promises.length) resolve(resList);
        },(err)=>{
            reject(err);
            break;
        });
    }
}
MyPromise.prototype.race = function(promises){
    for(var i=0;i<promises.length;i++){
        promises[i].then((res)=>{
            resolve(res);
            break;
        },(err)=>{
            reject(err);
            break;
        })
    }
}


var promise = new MyPromise(function(resolve,reject) {
    setTimeout(() => {
        resolve(3);
    }, 3000);
})
// 返回普通字符
// promise
// .then(res => {
//     console.log('hello world');
//     return 'wfe';
// })
// .then(res => console.log(res))

// 返回Promise对象
promise.then(res => {
  	console.log('第一次结果输出');
    return new MyPromise((resolve,reject)=>{
      setTimeout(() => {
        resolve('第二次结果');
      }, 3000);
	});
}).then(res => console.log(res))
