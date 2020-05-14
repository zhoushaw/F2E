/**
    1.节流函数

    节流函数特点，及应用场景。我们通常在网页端会有监听滚动条的需求，当滚动条向下滚动1000px以下时触发某个事件
    监听滚动条的事件可能短时间内触发多次会造成性能浪费，这时我们可以通过节流函数控制检测间隔，我们可以限制200
    毫秒内检测一次，减少不必要的性能浪费

    2.防抖函数

    防抖函数特点，及应用场景。我们通常会有用户在input框输入内容后校验用户内容是否符合规则的场景，我们希望在用
    户停止输入后的200毫秒后出发校验规则，而不是用户变输入变校验，这时我们可以通过防抖函数实现
 */

// throttle节流函数
// 指定时间内只执行一次，可多次执行
function throttle(fn,wait) {
    var timer,previous;
    return function() {
        var now = +new Date();
        if (!previous) previous = now;
        var time = wait - (now - previous);
        if (timer) clearTimeout(timer);
        if(timer<=0 || time>wait) {
            fn.apply(this,arguments);
            previous = now;
        } else {
            timer = setTimeout(() => {
                fn.apply(this,arguments);
                previous = now;
            }, time);
        }
    }
}
// 限制2s只能输出一次
var log = function() {
    console.log('woshishui');
}
var nFn = throttle(log,2000)

// setInterval(() => {
//     nFn();
// }, 200);


// 防抖函数
function debounce(fn,wait){
    var timer;
    return function() {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,arguments);
        }, wait);
    }
}



function throttle (fn,wait) {
    let timer;
    return function(){
        if(!timer) {
            timer = setTimeout(()=>{
                timer = null;
                fn.apply(this,arguments);
            },wait)
        }
    }
}

var log = function () {
    console.log('woshishui');
}
var nFn = throttle(log, 2000)

setInterval(() => {
    nFn();
}, 200);