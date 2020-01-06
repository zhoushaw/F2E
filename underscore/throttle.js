function throttle(fn,wait) {
    var context = this;
    var previous = 0;
    return function () {
        var now = +new Date();
        var args = arguments;
        
        if (now-previous>wait) {
            fn.apply(context,args);
            previous = now;
        }
    };
}


// 定时器版本

function throttle (fn,wait) {
    var timer;

    return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(context,args)
            }, wait);
        }
    }
}

function log () {
    console.log('1');
}

var throttleFn = throttle(log,2000);

var interval = setInterval(() => {
    throttleFn();
}, 0);

setTimeout(() => {
    clearInterval(interval);
}, 6000);