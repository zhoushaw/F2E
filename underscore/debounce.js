/**
 * 1.节流函数接收函数和延迟执行事件
 * 2.节流函数返回一个函数，并且函数的this与返回函数的this指向相同
 * 3.节流函数返回的函数，需要可以将参数传递给实际调用函数
 */

 function debounce (fn,delay,immediate) {
    var timer;
    var debounce =  function () {
        var args = arguments;
        var result;
        if (timer) clearTimeout(timer);
        if (immediate) {
            immediate = false;
            result = fn.apply(this,args);
        } else {
            timer = setTimeout(() => {
                result = fn.apply(this,args);
            }, delay);
        }
        return result;
    }

    debounce.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    }
    return debounce;
}

function log() {
    console.log(1);
}

var debounceFn = debounce(log,1200,true);

var interTimer = setInterval(() => {
    debounceFn();
}, 20);

setTimeout(() => {
    clearInterval(interTimer);
}, 2000);