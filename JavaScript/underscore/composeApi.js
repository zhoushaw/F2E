
let getUserInfo = (id) => {
    return new Promise((resolve) => {
        let num = Math.floor(Math.random() * 10)
        setTimeout(() => {
            resolve(id);
        }, num * 1000)
    })
}


let getUserInfoById = (() => {
    let reqId = [];
    let subscribe = [];
    let delay = 10

    let nReq = throttle(() => {
        getUserInfo(reqId).then((res) => {
            res.forEach((item) => {
                let fn = subscribe.shift();
                fn(item);
            })
        });
        reqId = [];
    }, delay);

    function throttle(fn, wait) {
        let timer;
        return function () {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    fn.apply(this, arguments);
                }, wait)
            }
        }
    }

    return function (id) {
        reqId.push(id);
        return new Promise((resolve) => {
            subscribe.push((res) => {
                resolve(res)
            });
            nReq();
        })
    }
})();


getUserInfoById(10).then((res) => {
    console.log(res);

})
getUserInfoById(20).then((res) => {
    console.log(res);
})
setTimeout(() => {
    getUserInfoById(30).then((res) => {
        console.log(res);
    })
}, 2000)
setTimeout(() => {
    getUserInfoById(40).then((res) => {
        console.log(res);
    })
}, 4000)


// let getId = debounce(()=>{

// }, 10)

// let getUserInfoById = (()=>{
//     let pre = 0;
//     let idList = [];
//     return (...ids) =>{

//     };
// })()