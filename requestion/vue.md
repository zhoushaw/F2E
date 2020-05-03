> 1.vue为什么实例上可以直接访问到data中的值

* 在vue进行初始化的时候对data中的键进行遍历
* 访问和修改实例上的属性都通过Object.definedProperty代理到了data上


> 2.什么是MVVM

* MVVM架构是由MVC架构转换而来的，将其中的C部分转换成了VM（viewModel）
* 不仅model层的数据改变，视图会跟着一起改变。视图层改变，model层也会跟着一起变化

> 3.如何实现数据响应

* Vue对data中的数据get、set操作进行拦截，当get时会获取当前的Watcher对象，如果存在Watcher对象将Wacher对象推入订阅队列中，set时通知订阅队列中的Watcher，执行更新操作
* 初始化阶段结束后，Vue会新建一个Watcher，这个Watcher的更新操作时会执行render操作
* render操作时会获取模板上使用的data数据，使用data数据会触发get操作将当前Watcher存入通知队列中，更改对应数据时会通知render执行更新操作

> 4.vue中如何实现数组监听

* 如果浏览器支持'__proto__'属性，会直接通过更改__proto__属性，来改变data中数组的原型
* 如果不支持__proto__属性，会直接通过复制新的数组方法到data中数组上
* 新的原型上对会改变数组自身方法进行了定义，如push、splice、sort、shift等数组方法
* 在方法内部会调用原生的数组方法，不过在更改数据前会对数组上收集的依赖进行通知

> 5.nextTick回调为什么会在dom更新后才触发,多次更改data中的数据为何只会触发一次更新

* $nextTick的设置实际上是利用了eventLoop，浏览器中将事件分为微任务和宏任务
* 浏览器中在单线程中为保证代码执行不会阻塞，单独分出了两个异步事件队列在同步任务执行完成后，会清空微任务队列，在执行宏任务队列
* 在更新data数据后，会将通过watcher通知render重新渲染，通知重渲染时在内部调用了nextTick，会在同步代码执行完执行微任务时才会重渲染，所以多次改变data数据只会触发一次
* 如果在更改数据之后，调用nextTick，nextTick会在下一个事件循环结束调用微任务时才会执行，所以可以拿到更新后的dom


> 6.vue的生命周期

* vue的生命周期可以分为一下几个阶段
    * beforeCreated，这个阶段Vue实例进入初始化阶段，刚初始化完成内部事件、生命周期，还没有对methods事件、data进行初始化，无法访问methods、data，并且不能进行更改
    * created，在这个阶段vue已经完成了对methods、data的初始化，此时可以正常访问data中的数据，更改数据时不会触发重渲染
    * beforeMounted,挂载前。这个阶段render渲染函数已经装载完成，对data数据进行更改不会触发视图渲染
    * mounted，挂载后。这个阶段已经完成了挂载，可以访问渲染后的真实dom，对数据更改会触发重新渲染
    * beforeUpdate，数据更新前，在对数据进行更改后，数据更新前会触发该函数
    * update，数据更新后，在对数据进行更新后，会触发该函数，不要在该函数内触发数据变更否则会造成死循环
    * beforedestroy，组件在摧毁前调用，可以在这里进行一些收尾工作，例如清除定时器
    * destroy，摧毁后。vue会移除数据响应式系统，事件监听。只会留下一个dom结构
* 包括子组件的生命周期
    * 创建阶段：父：beforeCreated，Created、beforeMounted，子：beforeCreated、Created、beforeMounted、Mounted、父：mounted
    * 更新阶段：父：beforeUpdate、子：beforeUpdate、Updated、父：Updated
    * 摧毁阶段：父：beforeDestory，子：beforeDestroy、destroyed，父destoryed

> 7.vue的computed、watcher：

* computed在data初始化后初始化，initComputed时会为每个key建立一个Watcher
* Watcher触发后通知的回调是computed的getter函数，这些Watcher会被缓存起来
* 在触发computed的get操作后，在get时会触发Watcher的Evaluate函数，这时会执行一遍computed函数，在执行并返回结果，在执行的过程中会触发data的get操作，这时data中的数据已经与computed的Watcher关联起来了，关联完成后，computed的Watcher与渲染Watcher进行了关联，

* computed在渲染时会触发computed定义时的get操作，get触发后会执行computed函数获取最终计算结果并缓存，执行函数的过程中会与data中的数据建立依赖关系
* 与data建立完成关系后，computedWatcher将渲染Watcher放在了自身的Dep中，当data中的数据变化通知Watcher，Computed Watcher通知渲染Watcher更新数据


* 区别
    * 因为data中的数据已经进行了劫持，当对data中的数据进行get操作的时候会进行依赖收集
    * computed中定义的属性函数在被get时，会触发函数执行
    * 这时函数中使用的data数据已经可以正常收集到了computed的watcher
    * 当有数据更新是也会通过computed的watcher，watcher也会通知进行视图更新
* watch没有缓存，只是简单的监听作用。当数据变化是会执行回调函数,在初始化时访问data中监听的数据，收集Watcher，数据变化是通知Watcher
* 不同点：
    * computed有缓存，computed的值是要被使用的，所以计算过程是同步的，值更新时才会触发computed重新计算
    * computed中的data会收集两个watch，一个是computedWatcher，另一个是使用了computed的Wacher，例如render，Watcher
    * watch没有缓存，就是一个简单的watch，会将watch收集到data的订阅队列中，当值发生变化时就会触发回调



> 8.v-if和v-show的区别

* v-if是判断是否渲染，false，dom不渲染出来，更改成false直接从dom移除
* v-show是通过更改，display属性，为false条件时，display为none


> 9.为什么data用的是一个函数

* 因为每个实例用的都是同一个构造函数，data是对象应用类型
* 如果不是一个函数每次执行时生成对象，可以保证实例间data不互相冲突

> 10.v-model如何实现的

* `v-model`对于表单组件而言只是语法糖
    * 实际上`<input v-model="val" />`会转变成`<input :value="val" @input="val = $event.target.val"/>`的语法糖
* `v-model`在组件上应用时会将其编译成@input，接受子组件传递事件过来，$emit，on的形式

> 11.@on事件的处理

* 在dom上使用，会将其转换成addEventListener、加入指定的监听事件
* 在组件上使用，会将其编程发布订阅模式，在父组件上通过vm.$on将订阅事件加入队列中
* 当子组件使用时，通知父组件执行队列中的事件


> 11.vue-router实现原理

* 两种模式：
    * hash模式
    * history模式
* 监听路由变化：
    * hash(window.addEventListener)
        * popstate
        * hashchange
    * history:
        * pushState
        * replaceState


* router在浏览器端主要分为两种模式hash模式，history模式。可以配置默认hash模式
* hash:
    * 主动跳转：window.location.replace函数、window.location.hash赋值
    * 返回、前进按钮：window.addeventListener('hashchange')
    * 根据路由地址匹配对应组件
* history:
    * 主动跳转：replaceState、pushState
    * 返回、前进按钮：window.addeventListener('popstate')
    * 根据路由地址匹配对应组件


> 12.打包多页

* 多入口多出口，每个页面都是一个vue实例
* 提取公共js，并缓存。每个页面单独js


> 13.预渲染与服务端渲染

* 预渲染：
    * 实现：
        * 通过prerender-spa-plugin插件应用，主要通过puppeter（chrome团队提供的，通过node.js控制无界面chrome）
        * 通过运行项目，使用puppeter抓取已经渲染好的html、css、js、数据
    * 优点：不需要部署node server每次动态解析填充数据，实现简单、
    * 缺点：个性化内容无法支持、页面较多build较慢
* 服务端渲染：
    * 
    * 通过vue-server-render对vue实例对象进行解析成最终html
    