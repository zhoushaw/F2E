

> 1.

```javascript
var a = {x:1};
var b = a;
a.x = a = {n: 1};
console.log(a);
console.log(b); 

var a = {n: 1}; 
var b = a;
a.x = a = {n: 2}; 
console.log(a.x);
console.log(b.x);

```

> 2


```js
Function.prototype.a = ()=> console.log(1);
Object.prototype.b = ()=> console.log(2);
var A = function(){}
const a = new A();
a.b();
console.log(a instanceof Function); // false
console.log(a instanceof Object); // true
console.log(A instanceof Function); 
// true、A.__proto__ === Function.prototype
// Function.prototype.__proto__ === Object.prototype
console.log(A instanceof Object); // true
console.log(Function instanceof Object);
console.log(Object instanceof Function);
```

> 3


```js
console.log(a); // undefined
var a = 0;
console.log(b); // undefined
let b =0;
console.log(c); // function
function c (){}
```

> 4.

```js
// var x = 10;
function a(y){
    var x = 20;
    return b(y);
}
function b(y){
    for(let x=0;x<30;x++) {}
    return x+y;
}
a(20)
```


> 5.扁平化数组，多层次嵌套

```js
function flatArr (arr){
    return arr.reduce((pre,next)=>{
        if(Array.isArray(next)) {
            pre = pre.concat(flatArr(next));
        } else {
            pre.push(next)
        }
        return pre;
    },[])
}
```

> 6.爬楼梯问题,优化空间

```js
function countN(n){
    if(n==1 || n==2) {
        return n;
    }
    return countN(n-1) + count(n-2);
}
```

> 7.flat实现

```js
let _flat = (()=>{
    var depathNum = 0;
    return function(arr,depath){
        return arr.reduce((pre,next,index)=>{
            if(Array.isArray(next)){
                if(depathNum<depath){
                    pre = pre.concat(next);
                    depathNum++;
                } else {
                    pre.push(next);
                }
            } else {
                pre.push(next);
                if (index===arr.length-1) depathNum = 0;
            }
            return pre;
        }, [])
    }
})();
```

> 8.eventEmit


```js
class EventEmit{
    constructor(){
        this.listener = {};
    }
    on(name,fn) {
        if (!this.listener[name]) this.listener[name] = [];
        this.listener[name].push(fn);
    }
    onOnce(name,fn){
        this.on(name,(...args)=>{
            fn(...args);
            this.remove(name);
        })
    }
    remove(name){
        delete  this.listener[name];
    }
    emit(name,...args){
        let list = this.listener[name] || [];
        list.forEach((fn)=>{
            fn(...args)
        });
    }
}

```

> 9.题目

```js
console.log(1);
setTimeout(() => {
    console.log(2);
}, 1000);
new Promise((resolve) => {
    console.log(3);
    resolve();
}).then(() => {
    console.log(4);
});
setTimeout(() => {
    console.log(5);
}, 0);
console.log(6);
// 1、3、6、4、5、2

var name = '123';
 
var obj = {
    name: '456',
    getName: function () {
        function printName() {
            console.log(this.name)    ;
        }
        printName();
        //bind
        printName.bind(this)();
        //call
        printName.call(this);
        //apply
        printName.apply(this);
        //=>
        printName = ()=>{
            console.log(this.name);
        }
        printName();
    }
}
 
obj.getName();

// 123、456、456、456、456

// 乱序输出数组
var arr = [1, 2, 3, 4, 5, 6];
var getRandomArr = function(arr){
    let nArr = [];
    while(arr.length>0) {
        let n = arr.length;
        let randomN = Math.floor(Math.random()*n);
        nArr.concat(arr.splice(n,1));
    }
    return nArr;
}
getRandomArr(arr)
```


> 10.rem

* 获取屏幕宽度，根字体大小