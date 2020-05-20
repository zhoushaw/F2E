
> 快手一面

* 实现一个div，高度屏幕一半，内容垂直水平居中
* 浏览器渲染步骤过程，html如何渲染出来的，具体步骤
* vue渲染过程
* 304啥意思，http文件修改时间具体是怎么样子的，last-modify怎么保证各端时间一致,和etag有什么区别
* px转rem怎么实现
* proxy和Object.definedProperty细节区别
* vue2.0与vue3.0区别
* 你在项目里做了哪些具体的性能优化
    * 通过是否支持type="module"，来判断是使用新的js还是兼容后的js
    * 可视化区域渲染，减少渲染节点。
    * 通过拆包减少第一次加载速度，import，splitChunk
    * 静态资源通过cdn，不打入bundle，声明external
    * 图片懒加载，http升级2.0。serverWork，拦截http请求
    * vue：
        * Object.freeze，冻结不需要改动的数据，减少劫持时间
    * react
        * hook使用React.memo，useMemo、useCallback减少重复渲染
        * class组件使用pureComponent、shouldUpdateComponent减少渲染



> 快手二面

* 你简单介绍一下你做过的项目
* 有哪些做的比较好的地方
* es6模块，commonjs

```js
vue data () {}

a 
export const a  ={}
b
import {a } from 'a'
a.x = 1;

c.
import {a } from 'a'
a.x 1 or undefined

es6 commonjs
tree-shaking
```

* vue3
    proxy
    diff优化
    composite 

* vue.$nextTick，setTimeout无效调用

```js
// vue.$nextTick

// promise 
// setTimeout

function a () {
    setTimeout(a);
    process.nextTick(a);
}
```

* 你怎么带新人
* 三个有序数组的合并

[3,2,1]
[5,2,1,0]
[10,9,8,7]

合并成一个有序数组
降序

```js

function compose(...args){
    function mergeArr(arr1,arr2){
        let result = [];
        let start1 = arr1.length-1;
        let start2 = arr2.length-1;
        while(start1>=0&&start2>=0){
            if (arr1[start1]>=arr2[start2]){
                result.push(arr1[start1]);
                start1--;
            } else {
                result.push(arr2[start2]);
                start2--;
            }
        }
        if (start1!==0) result = result.concat(arr1);
        if (start2!==0) result = result.concat(arr2);
        return result;
    }
    let first = args.shift();
    return args.reduce((pre,next)=>{
        return mergeArr(pre,next);
    },first)
}
```


* 并发，加添加

```js
class TaskManager {
    constructor(){
        this.stack = [];
        this.task = [];
        this.limit = 10;
    }
    addTask(promise) {
        this.stack.push(promise);
        return new Promise((resolve)=>{
            this.task.push((res)=>{
                 resolve(res);
            })
        })
    }
    
    run(){
        let run = (promise)=>{
            promise().then(res=>{
                let callback = this.task.shift();
                callback(res);
                let nextPromise = this.stack.shift();
                run(nextPromise);
            })
        }
        this.stack.splice(0,this.limit+1).forEach((promise)=>{
            run(promise);
       })
    }
}
```

<!-- 

Object.definedPropety(fn,'val',{
    get(){
        return val;
    }
})

实现一个DIV： 1. 其距离屏幕两边都是20px 2. 高度是屏幕宽度的50% 3. div内有文本“快手”，要求快手垂直水平居中

vw单位

rem单位：

构建层实现把px转成rem的工具


实现一个函数isStringValid，判断字符串是否是有效字符串，如果正确，就返回true，如果错误，返回false

{ } [] ()

a{aac} true 

a{}} false

k(u{a})(I()[s]){h}ou   =>  true
kua(i[[]}s)ho(u)   =>  false
k(u{a})(I()[s]){h}ou  => true

实现一个函数add

add(1).val => 1
add(1)(2).val => 3
add(1)(2)(3).val => 6 


let add = (()=>{
    let val = 0;
    function fn(n){
        val = val+n;
        return fn;
    }
    Object.definedPropety(fn,'val',{
        get(){
            return val;
        }
    })
    fn.val = function(){
        return val;
    }
    return fn;
})()

-->