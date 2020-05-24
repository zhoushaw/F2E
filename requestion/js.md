
[复习资料](https://juejin.im/post/5e8b163ff265da47ee3f54a6)


> 1.基础数据类型

string、number、boolean、null、undefined、symbol

> 2.复杂数据类型
object、array、function

> 3.类型判断（typeof）
string、number、boolean、undefined、symbol、object、function

* NaN，是数字类型，但是数学运算没有成功，返回了失败的结果
    * isNaN用于判断传入的变量是否能转换成数字，如果可以返回false，不可以返回true

> 4.类型判断准确（toString）

* Object.prototype.toString.call(val)
* [object Type]

> 5.说一说你对JS执行上下文栈和作用域链的理解

* 执行上下文分为两种类型：全局执行上下文、函数执行上下文
* 执行上下文分为两个阶段：创建阶段、激活/执行阶段
* 执行上下文在创建阶段会初始化：变量对象、作用域链、this指向
* 执行上下文以栈的形式存储，按照先进后出的原则，所以在全局代码尚未执行完成，底部始终有一个全局执行上下文


> 6.let、var、const区别

1.三者都表达的是变量申明
2.var申明，创建上下文阶段会出现变量提升，在申明前使用变量会变量值为undefined
3.let、const声明会出现暂时性死区，无法在变量申明前使用变量
4.const变量初始化必须携带值,申明后无法进行引用更改，意思就是普通类型无法改变，应用类型不能改变索引

> 7.手写new执行过程的函数

* 在new执行阶段主要做了以下几件事情
    * 创建一个新对象
    * 将这个新对象作为构造函数的上下文
    * 将新对象的__proto__属性指向构造函数的原型
    * 若构造函数执行的结果是对象（非null）或函数直接返回执行结果
    * 否则返回新对象

```javascript
function _new(){
    var target = {};
    let [fn,...args] = arguments;
    target.__proto__ = fn.prototype;
    var result = fn.apply(target,args);
    if((typeof(result)==='object' || typeof(result)==='function') && result !== null) {
        return result;
    }
    return target;
}
```

> 8.this的指向

* this的指向主要分为一下几种情况
    * new创建的新对象，this指向新对象
    * 是否是通过硬绑定形式的对象，apply、call执行指定对象
    * 箭头函数中的this，取决于箭头函数外的环境
    * 是否是隐式调用，通过对象的形式调用自身上的方法
    * 默认绑定，在非严格模式下，指向window或global，否则报错

> 9.深拷贝

* 主要是普通值引用和对象类型的引用关系
[解决循环引用](https://www.jianshu.com/p/b4960aaec20b)
[强引用，弱引用](https://juejin.im/post/5dbebbfa51882524c507fddb#heading-58)

```javascript
function deepCopy(val) {

    var constructor = getType(val);

    if (constructor!=='Array' && constructor!=='Object'){
        return val;
    }
    var nObj = constructor !== 'Array'?{}:[];

    for (var i in val) {
        var nType = getType(val[i]);
        if (nType==='Array'||nType==='Object') {
            nObj[i] = deepCopy(val[i]);
        } else {
            nObj[i] = val[i];
        }
    }

    function getType(val) {
        return Object.prototype.toString.call(val).slice(8, -1);
    }

    return nObj;
}
```

> 10.节流函数、防抖函数是什么，有什么作用如何写

* 概念：
    * 防抖函数,在一段时间内只会执行一次，适用场景，浏览器宽度调整，页面自动适用宽度改变布局，限制触发频率，例如500秒做一次判断，是否需要改变根据宽度自适应
    * 防抖函数，在一段时间后没执行该函数，执行。适用场景，搜索框输入出现推荐搜索词条时，在用户停止输入300毫秒后执行服务端请求

* 节流函数：

```javascript
// function throttle(fn,wait){
//     var timer,pre;
//     return function(){
//         var now = +new Date();
//         var args = arguments;
//         if(!pre) pre = now;
//         var time = wait - (now-pre);
//         if(timer) clearTimeout(timer);
//         if(time<=0 || time>wait) {
//             fn.apply(this,args);
//             pre = now;
//         } else {
//             timer = setTimeout(()=>{
//                 fn.apply(this,args);
//                 pre = now;
//             },time)
//         }
//     }
// }
function throttle(fn,wait){
    let timer;
    return function(...args){
        if(timer) return;
        timer = setTimeout(()=>{
            timer = null;
            fn.apply(this,args);
        },wait)
    }
}
```

* 防抖函数：

```javascript
function debounce(fn,wait = 200){
    var timer;
    return function(){
        var args = arguments;
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },wait);
    }
}
```

> 11.函数柯里化

* 概念：
    * 函数柯里化是将接收多个参数的函数，转换为接收单个参数的函数
    * 并且返回接收剩余参数的函数，若参数长度已达到函数入参标准则返回结果

```javascript
function curry(fn,...args){
    var len = fn.length;
    return args.length>=len?fn.apply(this,args):(...nArgs)=>curry(fn,...args,...nArgs);
}
```

> 12.手写Promise

* 实现Promise基础功能
* Promise链式调用
* Promise.race方法
* Promise.all方法

> 13.手写apply、call

```javascript
Function.prototype._call = function(){
    let [target,...args] = arguments;
    let _contructor = this;
    if(target===undefined || target === null){
        target = typeof window !== 'undefined'? window: global;
    }
    var key = Symbol('key');
    target[key] = _contructor;
    var result = target[key](...args);
    delete target[key];
    return result;
}
```

* 实现bind
    * 将this绑定到指定this对象
    * 将目标函数的原型指向新返回函数的原型

```javascript
Function.prototype._bind = function(){
    if (typeof this !== 'function') {
        throw '调用必须为函数'
    }
    let [context,...args] = arguments;
    var callFn = this;
    var nFn = function(){
        return callFn.apply(this instanceof nFn? this : context,args);
    }
    if (this.prototype) {
        nFn.prototype = Object.create(this.prototype);
    }
    return nFn;
}
```

> 14.模块化

[模块化文章](https://juejin.im/post/5aaa37c8f265da23945f365c)

* 在JavaScript中分为两种模块化标准，commonJS、es6标准
* commonJS是node中的模块化标准，而es6标准是ECMAScript后续推出的标准

* 两者存在的差异
    * commonJS输出的是值的拷贝，es6模块输出的是值得引用
    * commonJS是运行时输出，在导入模块后。会执行导入脚本内容
    * es6模块不是对象，它对外接口只是一个静态定义，在代码静态解析阶段就会生成，不能放在块级作用域
    * es6的运行机制与commonJS不同，JS引擎对脚本静态分析时
    * 遇到模块加载命令`import`就会生成一个只读引用，在脚本在真正执行时，再根据这个只读引用到被加载的模块取值

* node，13.2开始允许commonJS可以与es6混用，.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载
* .js文件的加载取决于package.json里面type字段的设置


* COMMONJS：
    * node使用的方案
    * 使用：
        * require、module、exports、global
        * 导入：require、导出module.exports、exports
        * exports是module.exports的引用
    * 特点：
        * 使用同步导入
* AMD：
    * 特点：采用异步加载，所有模块加载完成后才会执行回调
    * 使用：
        * 使用：require，加回调函数，在回调函数中拿到加载的模块
        * 定义：defined，如果模块本身有依赖，第一个参数为数组依赖的模块
* CMD：
    * [cmd和amd区别](https://blog.csdn.net/qq_38912819/article/details/80597101)
    * require后第一时间，加载并执行模块，amd提前执行，cmd延迟执行
    * CMD使用时才加载，
* es6module
    * 特点：
        * es6模块不是对象，import命令会被静态分析，编译时导入，而不是在运行时加载
        * 静态分析成为可能
    * 使用：
        * 导出：export、export default
        * 导入：import，或import函数

* commonJs和es6的区别：
    * 输出：
        * commonJS输出的是值得拷贝，es6输出的是值得引用
        * commonJS运行时加载，es6编译时导入接口
    * es6：是编译时导出接口，所以不会执行脚本
    * commonJS：会执行脚本，然后导出值


> 15.箭头函数的特点

* 箭头函数内的this，取决于外层作用域
* 箭头函数没有arguments
* 箭头函数不能使用new
* 箭头函数都是匿名函数

> 16.什么是闭包

简单用一句话概括就是，闭包就是一个函数能够访问他的词法作用域，即使这个函数在他的词法作用域外执行

> 17.如何实现继承，es6继承与之有何不同

> 18.eval的用处

* eval将传入的字符串当做javascript代码执行，返回执行结果
* 传入的不是字符串将原样返回
* 将字符串解析成对象，对象字符串外层需要包一下括号，否则会报错
* 将代码在全局作用域执行,newfunction始终是当前作用域


> 19.原型和原型链

* [原型和原型链](https://juejin.im/post/5c72a1766fb9a049ea3993e6) 
* [js原型重新赋值对象变化](http://www.mamicode.com/info-detail-266268.html)
* [instanceof原理](https://juejin.im/post/5b0b9b9051882515773ae714#heading-1)
* 所有构造函数都是Function的实例，所有原型对象都是Object的实例除了Object.prototype。

* 实现继承：

> 20.正则

* 常用方法：
    * exec,返回匹配的数组
    * test，匹配成功返回boolean

> 21.instanceOf

* 实现instanceOf

```js
function instanceOf(left,right){
    while(left){
        if (left.__proto__ === right.prototype) return true;
        left = left.__proto__;
    }
    return false;
}
```


> 22.Proxy和Object.defineProperty


* Proxy直接对对象进行代理
    * 可以直接拦截到对象的，get、set、has、apply多达13种方式
    * 针对数组拦截，调用push、splice会触发Proxy代理对象的set
    * 可以配合Reflect使用，对对象操作规范化
* Object.defineProperty
    * 只能拦截对象的指定属性，无法拦截操作方法
    * 对数组拦截，只能更改拦截数组的原型，或者将数组的访问方法代理到另一个更改的原型上


> 23.伪数组与真实数组

* 真实数组是array结构
* 伪数组是一个由一个对象构成的
    * 伪数组通过0、1、2这样的key索引来存储值
    * 它有length属性
    * 并且它有Symbol.interator属性，来设置迭代返回值


```js
const obj = {
    '0': 0,
    '1': 1,
    '2': 2,
    [Symbol.iterator] () {
        var current = this;
        let index = 0;
        return {
            next: function () {
                if(typeof current[index]!=='undefined'){
                    return {
                        value: current[index++],
                        done: false
                    }
                } else {
                    // index = 0;
                    return {
                        done: true
                    }
                }
            }
        };
    }
};
```