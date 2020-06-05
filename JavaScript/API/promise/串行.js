


let serialPromise = function (promises){
    let first = promises.shift();
    return promises.reduce((pre,next)=>{
        return pre.then((res) => next(res));
    },first())
}


let promise1 = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('promise1');
            resolve('123');
        }, 2000)
    })
}

let promise2 = function (res) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('promise2:' + res);
            resolve(res + '456');
        }, 2000)
    })
}

let promise3 = function (res) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('promise3:' + res);
            resolve(res + '567');
        }, 2000)
    })
}


serialPromise([promise1, promise2, promise3])
.then((res)=>{
    console.log(res)
})
