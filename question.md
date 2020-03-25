> 问题1：let、var、const区别

1.三者都是变量的代表了变量的声明
2.let和const都有暂时性锁区，不能在声明前使用变量。不会出现变量提升，不能重复声明
3.const用于声明常量，声明后不可更改。const在声明时必须初始值
4.var会出现变量申明提升


> 问题2：说一说你对JS执行上下文栈和作用域链的理解

概念：执行上下文指的就是JavaScript代码在执行时所在环境的抽象概念
分为：全局执行上下文、函数执行上下文

执行上下文创建时，需要做的事情：

1.初始化变量对象，初始化arguments，变量、函数声明提升
2.创建作用域链
3.确定this指向


> 问题3：防抖函数、节流函数

概念：防抖函数与电梯等待机制非常类似，电梯在某层停住后，如果有人在3秒内进入电梯则不会关门，如果在3秒内有人进入则重新计时

``` js
function debounce(fn,await,immediate=true) {
    var timer,result;
    let debounce = function() {
        var args = arguments;
        if (immediate) result = fn.apply(this,args);
        if (timer) clearTimeout(timer);
        timer = setTimeout(function(){
            result = fn.apply(this,args);
        },await);
        immediate = false;
        return result;
    }
    debounce.cancel = function() {
        clearTimeout(timer);
        timer = null;
    }
    return debounce
}

function throttle(fn,wait) {
    var timer,last,result;
    return function () {
        let now = +new Date();
        if (!last) last = now;

        let remaining = wait - (now - last);

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (remaining<=0 || remaining>wait) {
            last = now;
            fn.apply(this,arguments);
        } else {
            timer = setTimeout(() => {
                last = now;
                fn.apply(this,arguments);
            }, remaining);
        }
    }
}
```

> 问题4：什么是闭包？

1.闭包就是函数能够记住并访问他的词法作用域，即使这个函数在他的词法作用域外执行


> 问题5：手写promise？

```js

const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVE = 'resolve';
function _Promise(handle){

    this.status = PENDING;
    this.resolveList = [];
    this.rejectList = [];
    this.result = null;
    this.err = null;

    let resolve = (res)=> {
        this.status = RESOLVE;
        this.result = res;
        this.resolveList.forEach(fn=>fn());
    }

    let reject = (res) => {
        this.status = REJECTED;
        this.err = res;
        this.rejectList.forEach(fn=>fn());
    }

    status = PENDING;
    handle(resolve,reject);
}


_Promise.prototype.then = function (resolve,reject) {
    if (this.status === RESOLVE) {
        resolve(this.result);
    }

    if (this.status === REJECTED) {
        reject(this.result);
    }

    if (this.status === PENDING) {
        this.resolveList.push(()=>{resolve(this.result)})
        this.rejectList.push(()=>{reject(this.err)})
    }

}


var promise = new _Promise(function (resolve,reject) {
    setTimeout(() => {
        resolve();
    }, 2000);
})

promise.then(res => {
    console.log('结果')
})

```


> 问题6：数组去重


> 问题7：居中


1.水平居中：

a.行内元素：text-align
b.块元素：absolute+margin、absolute+transform、flex+justify-content:center

2.垂直居中：

a.行内元素：line-height
b.块元素：absolute+margin、absolute+transform、flex+align-items:center

3.水平垂直居中

a.absolute+margin、absolute+transform
b.flex+justify-content+align-items


> 问题8：选择器优先级

a.!important>id选择器>class选择器>标签选择器>*>继承>默认


