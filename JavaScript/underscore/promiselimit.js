// Promise.prototype.limit = function (promises, limit, callback) {
//     return new Promise((resolve, reject) => {
//         var total = promises.length;
//         var result = new Array(total);
//         var done = 0;
//         var reject = false;
//         function run(p) {
//             p().then(res => {
//                 if (done < total) {
//                     done++;
//                     run(promises.shift())
//                     result.push(res)
//                     callback(res);
//                 } else {
//                     resolve(result);
//                 }
//             }, (err) => {
//                 reject = true;
//                 reject(err);
//             })
//         }
//         promises.slice(0, limit).forEach((p) => {
//             run(p);
//         })
//     })
// }

var pm = ()=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('val')
        }, 1000)
    })
}
var list = [pm, pm, pm, pm, pm,];

// Promise.prototype.limit(list,2,(res)=>{
//     console.log(res);
    
// }).then((ress)=>{
//     console.log(ress);
// })


// // function asyncPool(poolLimit, array, iteratorFn) {
// //     let i = 0;
// //     const ret = [];
// //     const executing = [];
// //     const enqueue = function () {
// //         if (i === array.length) {
// //             return Promise.resolve();
// //         }
// //         const item = array[i++];
// //         const p = Promise.resolve().then(() => iteratorFn(item, array));
// //         ret.push(p);
// //         const e = p.then(() => executing.splice(executing.indexOf(e), 1));
// //         executing.push(e);
// //         let r = Promise.resolve();
// //         if (executing.length >= poolLimit) {
// //             r = Promise.race(executing);
// //         }
// //         return r.then(() => enqueue());
// //     };
// //     return enqueue().then(() => Promise.all(ret));
// // }


var pm = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('val')
        },2000)
    })
}

let limitPromise = (promises,limit)=>{
    return new Promise((resolve,reject)=>{
        let total = promises.length;
        let result = [];
        let done = 0;
        function run (p){
            p().then((res)=>{
                if(total>done&&result.length<limit) {
                    done++;
                    run(promises.shift());
                } else if(done===total) {
                    resolve(result);
                }
            }).then(callback)
        }
        promises.slice(0,limit).forEach((p)=>{
            run(p);
        })
    })
}