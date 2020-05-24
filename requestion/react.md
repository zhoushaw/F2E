

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

> 3.React高阶组件

* React高阶组件用于复用组件逻辑的高级技巧
* 它是基于React组合特性而形成的设计模式
* [创建高阶组件](https://juejin.im/post/5cad39b3f265da03502b1c0a)

* 转发ref，高阶组件上直接使用ref，可以通过`React.forwardRef`,获取到上层传入的ref，存放在内部dom中
* 创建高阶组件：
    * 创建一个函数，函数内返回一个组件，组件的render中使用传入的组件
    * 对组件进行包装，透传props,生命周期创建做一些共同的事情


> 4.性能优化

* pureCompoent、shouldCompoenntUpdated
* React，memo，浅比较props
* React Hook、useMemo对数据缓存、useCallback 事件缓存，保存上一次的地址引用

* 减少不必要的计算：
    * 渲染函数减少计算量，减少不必要的嵌套，虚拟列表，惰性渲染
    * React.lazy，不是立即可见的后续渲染
* 避免重渲染：
    * [memo、useCallback、useMemo](https://juejin.im/post/5d8dd1d6f265da5b950a431c)
    * 简化props
    * class组件通过
        * pureComponent、shouldComponentUpdate来减少不必要的渲染
    * 函数式组件：
        * 通过React.memo来减少不必要的渲染，与pureComponent一样,不过只会检测props的有没有更改
        * 使用useCallback缓存事件，否则每次渲染父组件，箭头函数都会重新生成，指定参数发生变化才更新
        * 使用useMemo，指定值发生变化才更新传入值
        * 使用总结：
            * 如果子组件没有接收父组件的事件和props时，使用React.memo即可
            * 如果子组件使用了父组件的事件和props，使用useCallback，useMemo进行缓存
            * React.memo只会对传入的值做浅比较


> 5.Hook

[react hook](https://www.jianshu.com/p/aafccf6e9ad6)
[hook 原理](https://github.com/brickspert/blog/issues/26)
[hook详解](https://juejin.im/post/5e53d9116fb9a07c9070da44)
[精度react hooks](https://segmentfault.com/a/1190000018639033#item-2-13)

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
    * 可以将forwordFef转发给子组件
    * ref对象在整个生命周期内保持不变，返回的是一个js对象，不过会闭包缓存起来
    * useRef实际就是通过useState实现的，初始化current,可以当做state来使用
    
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

* 新增生命周期：
    * getSnapshotBeforeUpdate
        * state更新之后，render真正DOM渲染之前。接收之前的props、state，返回值作为componentDidUpdate的第三个参数。根绝更改值做一些之前的状态存储，如果往顶部插入了新元素，保证当前位置可视区位置不发生变化
        * 场景：
            * 根据之前的props和state判断是否数据新增了，


> 7.fiber

[fiber](https://juejin.im/post/5dadc6045188255a270a0f85)


> 8.setState

[setState事件合并](https://juejin.im/post/5b45c57c51882519790c7441)

* 异步情况：
    * 合成事件、生命周期
    * 会维护一个事件队列，在渲染前执行，进行优化
    * 本身执行过程和代码都是同步的，只是合成事件和钩子函数的调用在更新之前
    * 导致没法立马拿到更新的值，形成了所谓的异步
    * 在合成事件和setTimeout中会批量更新，如果是同一个key值得话，会发生覆盖
* 同步：
    * 原生事件、setTimeout
    * setState的优化也是建立在合成事件和钩子函数的条件之上的，在原生事件和setTimeout中不会批量更新
* 同步和异步不是说内部是使用异步代码实现的，

> 9.redux

* redux和vuex将数据和行为集中管理
* 提供数据读取、修改，数据单向流
* 外部无法直接更改数据

> 10.受控组件和非受控组件

* 受控组件表单数据是组件状态控制的
* 非受控组件表单数据需要通过Dom获取不受状态控制