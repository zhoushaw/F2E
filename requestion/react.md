

> 1.函数式组件与类组件有什么不同

[函数式组件与类组件有什么不同](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)
[babel转换](https://babeljs.io/repl)
[React面试题](https://juejin.im/post/5d5f44dae51d4561df7805b4)


> 2.JSX

* jsx有什么作用
    * jsx是基于，js的扩展
    * 渲染逻辑与其他UI逻辑内在耦合，在UI需要处理绑定事件，在某些时刻状态发生变化需要通知到UI
* JSX是什么：
    * jsx是React.CreateElement语法糖

> 3.React生命周期


> 4.React高阶组件

* React高阶组件用于复用组件逻辑的高级技巧
* 它是基于React组合特性而形成的设计模式


> 5.Hook

[react hook](https://www.jianshu.com/p/aafccf6e9ad6)
[hook 原理](https://github.com/brickspert/blog/issues/26)

* 他可以让你在不编写class的情况下使用state以及其他React特性
* Hook不能在class组件中使用，不用class也能使用React

* mixins之所以被否定，是因为Mixins机制是让多个Mixins共享一个对象的数据空间，这样就很难确保不同Mixins依赖的状态不发生冲突
* Hook规则：
    * 只能在函数最外层调用Hook，不要在循环、条件判断或子函数调用
    * 只能在React函数组件内调用
* 自定义Hook
    * 通过use开头，内部使用useState、useEffect
* 为什么不能再if、else。for中使用hook
    * hooks函数执行完成之后依然访问到上次的变量，主要是使用闭包
    * react将hook函数调用后的state存储起来，在下次运行时根据执行顺序，state拿到旧的state
    * 确保hooks的执行顺序一致
    * hooks通过执行顺序找到对应的state
* useEffect：
    * 相当于 componentDidMount 和 componentDidUpdate:
    * 副作用函数通过返回一个副作用函数来清除副作用
        * 相当于componentWillUnmount，但由于他不太一样
        * 每次执行effect都会先清除副作用
    * 可以通过指定第二个参数，在某些值发生变化才执行副作用函数
    * effect是异步执行的
* useRef:
    * 可以获取dom对象，current
    * 因为是引用类型的值，可以存储值，变动每次都可以获取到最新的。解决effect只能拿到上次闭包的值

    
> 6.生命周期
[生命周期](https://juejin.im/post/5df648836fb9a016526eba01)

* 旧版本生命周期：
    * mounted：
        * componentWillMounted
        * render
        * componentDidMounted
    * updated：
        * props：
            * componentWillreceivedProps
            * shouldComponentUpdate
                * true=>render=>componentDidupdate
                * false
        * states：
            * shouldComponentUpdate
                * true=>componentWillUpdate=>render=>compnentDidUpdate
                * false
    * unMounting
        * componentWillUnmount
* 新版本生命周期：
    * mounted：
        * getDerivedStateFromProps
        * render
        * componentDidMounted
    * updated:
        * new Props=>getDerivedStateFromProps
        * setState=>
        * =>shouldComponentUpdate=>redner=>getSnapshotBeforeUpdate=>compnentDidUpdate
    * unMounting:
        * componentWillUnmount
    * componentDidCatch



> 7.hooks

[hook详解](https://juejin.im/post/5e53d9116fb9a07c9070da44)


> 8.性能优化

* pureCompoent、shouldCompoennt
* React，memo，浅比较props
* React Hook、useMemo对数据缓存、useCallback，保存上一次的地址引用



