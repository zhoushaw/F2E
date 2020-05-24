
[vue常见问题](https://juejin.im/post/5d59f2a451882549be53b170)

> 1.vue为什么实例上可以直接访问到data中的值

* 在vue进行初始化的时候对data中的键进行遍历
* 访问和修改实例上的属性都通过Object.definedProperty代理到了data上


> 2.什么是MVVM、MVC

* MVC
    * 分别是model、view、controller，model和view不直接联系，联系是单向的
    * controller通过操控model来改变view
* MVP：
    * MVP从MVC演变而来，将controller变成了presenter，它与MVC相似，model提供数据，view提供视图，presenter提供行为
    * 将view和model进行了分离，view不直接使用model，他们之间的通信通过presenter来进行，所有交互都发生在presenter中
* MVVM：
    * 将MVP中的presenter变成了ViewModel
    * 实现了Observer，当数据发生变化时，视图也会改变。视图中的数据改变时，model层也会进行改变


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
    * URL中的hash值只是客户端的一种状态，浏览器不会将hash值带给后端
    * 浏览器的hash值发生变化不会触发网络请求，并且会生成浏览记录，前进后退都不会受到影响
    * 主动跳转：window.location.replace函数、window.location.hash赋值
    * 返回、前进按钮：window.addeventListener('hashchange')
    * 根据路由地址匹配对应组件
* history:
    * history是History Api来实现URL变化，不会触发网络请求并且，会留下浏览记录
    * 主动跳转：replaceState、pushState，replace和push都不会触发popstate，需要手动触发重渲染
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
    * [vue ssr](https://segmentfault.com/a/1190000016637877)
    * 通过vue-server-render对vue实例对象进行解析成最终html
    
> 14.proxy和Object.definedProperty

* 不同点：
    * 属性劫持：
        * Object.definedProperty是通过对对象上的属性进行劫持，如果属性也是对象需要深度遍历，新增属性需要对新属性进行劫持。
        * Proxy直接通过对象代理，不需要遍历操作
    * 操作内容：
        * Proxy支持13中拦截方式，get、set、has、delete、apply等

> 14.vue和react选型

[vue、react对比](https://juejin.im/post/5e153e096fb9a048297390c1)
[详细对比 ](https://juejin.im/post/5c0a92f2e51d455b3d3dc181)

* 核心思想：
    * vue：拥抱js+css+html的形式，将结构、表现、行为相分离的形式。提倡编写template，vue通过Object.definedProperty对数据更细致的监听，vue更加直观，对新手更友好
    * react：拥抱函数式编程思想，all in js。将html、css、js全部融入js中，写页面就像是在写js。setState、props值更新后，render函数会重渲染，可以通过shoudUpdateMounted、pureCompound减少不必要的渲染，没有vue省事，生态比vue更好
    * 为什么React不细致监听数据变化：
        * Vue强调的是数据可变，会对data进行get和set
        * React强调数据不可变，通过对数据引用的方式进行比较，手动触发视图更新，否则会造成大量的vnode重渲染
* 渲染：
    * react：
        * react如果组件的某个状态发生变化，那么react会把此组件和其子组件全部重新渲染一遍
        * 不过重新渲染不代表，抛弃上一次的渲染结果，react还是通过diff算法，path到最终dom上
        * 不过组件树过大，会造成不必要的性能浪费，diff算法会有一部分的性能开销
        * react组件通过shouldComponentUpdate来判断组件是否需要执行后续的diff、path、update
        * 一般使用pureComponent来做这一层判断，pureComponent和shouldComponent只是浅比较，如果是对象引用没发生变化则认为没发生变化
        * 触发更新：
            * react进行的是浅比较，直接修改对象上的属性，再通过setState进行更新
    * vue:
        * 通过Object.definedProperty，进行了依赖的收集，不会像react一样整棵树去比较
        * 会根据收集的依赖更细致化的去更新状态有变化的组件
        * 基于Object.definedPerproty这种虽然会让代码变得更加简洁，但是当数据过于庞大时，对data进行递归遍历可能花费的时间较长，
* 场景对比：
    * vue适合于小的应用
        * vue的设计在大的应用上逻辑复用组件复用是不如react的
        * vue的编写更加友好，通过指令、等方式可以让代码逻辑更加简洁
    * react对于
        * 对于组件逻辑复用比vue更好，适合大型应用
        * 针对性对数据进行优化，性能可以做的更好
        * 社区提供的方案更多，生态更好

* 逻辑复用：
    * React函数组件对，HOC使用比较友好
    * Vue通过minxins、directives指令实现逻辑复用，vue也支持高阶组件类似keep-alive
* 组件形式：
    * vue通过xx.vue文件形式，组成template+script+css，使用模板语法
    * react通过js文件来表示组件，由函数或者class来组成
* 数据管理：
    * vue和react都采取单向数据流，props的数据更新会触发子组件重渲染，反之则不行
* 组件数据传参：
    * vue通过props、$emit，传递和通信、
    * react通过传递数据和回调函数的方式数据传递
* 跨组件数据通信：
    * vue通过provide、inject方式传递数据
    * react通过Context传递值
* class与style：
    * vue可以传递字符串、数组、对象给class、传递数组、对象给style
    * react通过className指定css的class，传递字符串变量不能传递数组、对象
* 生命周期：
    * vue：beforeCreated、created、beforeMounted、mounted、beforeUpdate、update、actived、deactived、beforeDestroy、destroy


* 对比：
    * 组件化：
        * vue通过vue单文件形式表明一个组件，通过结构、表现、行为相分离。更符合web开发者习惯
        * react通过函数或者类的形式，组织组件，函数式思想
    * 生态：react生态比vue更好、社区更庞大，周边资源更多
    * 支持：
        * vue有evan you创立，由二十多个团队成员维护
        * react由facebook，一个团队定期维护react，facebook内部使用react。相对而言react更稳定
    * 上手：
        * vue对新手更友好、官方文档更加清晰
        * react相对而言上手难度更高一点
    * 灵活性：
        * vue通过模板的形式定义组件，没有reactjs函数那么灵活
        * react多于跨平台有着更好的支持
    * 渲染速度：
        * vue有着更快的渲染速度，更小的体积
* 总结：
    * vue通过模板语法，可读性相对而言更好。
    * react有更庞大的社区，生态、工具链
    * vue更小更快
    * react多跨端、表现更加灵活
    * 两者都是视图型框架库，虚拟dom渲染、轻量级、响应式组件，易于集成周边工具

> 15.vue组件通信有哪几种方式

* props、$emit
* ref、this.$parent、this.$children
* eventBus,$emit、$on
* provide、inject
* vuex跨组件通信

> 16.vuex

[vuex源码分析](https://zhuanlan.zhihu.com/p/78981485)

* vuex是vue的状态管理系统，每个vuex的核心是store
* state是存储的状态
* getter允许组件从store中获取值
* mutation，同步更改state中的值
* action
    * 通过提交mutation更改值，定义的函数第一个参数是当前上下文
    * 有commit，可以用于提交mutation
    * 可以通过store.dispatch提交值
* module，将store分割成模块，每个模块都有自己的state、mutation、action、getter

* vuex源码：
    * 通过vue.use注入，提供install函数来进行插件安装
    * 将vueInit混入vue的beforecreated中
    * 在beforeCreated时，将根节点的store，放到this.$store中
    * 构造函数初始化变量、执行安装module、通过VM使store响应式
    * 注册moutation、getter、递归安装所有子module。如果有nameSpace，处理nameSpace
    * vuex将数据放到全局store中，再将store放到每个vue组件实例上
        * 通过vue混入机制，将vuexinit混入到vue的beforCreated生命周期
        * 将根组件的store赋值给$store,自组将在创建前，将父组件的store赋值给子组件的$store
    * vuex数据响应式：
        * 借助vue的data数据响应式，将data存入vue实例组件的data中
        * vuex中的getter则是借助vue的计算属性computed实现的
        * vuex中对getter进行了遍历，拦截了get，在访问getter的时候实际上访问的是vue实例上的computed属性
        * computed会生成一个watcher，data中的数据会收集当前的watcher，值更新时触发watcher更新

> 17.keep-alive

[keep-alive原理](https://juejin.im/post/5cce49036fb9a031eb58a8f9)


* keep-alive是vue的一个抽象组件，它不渲染任何dom，也不会出现在父组件链中
* 使用keep-alive包裹活动组件，在不活动时缓存它而不是销毁它

* 使用：
    * 通过include、exclude，max定义缓存组件上线
    * 超过上线使用LRU策略，换缓存，LRU：最近最少使用的组件，给每个组件配置一个时间，替换掉时间最久的组件或页面

* 原理：
    * 在created的时候定义缓存虚拟dom、缓存虚拟dom键的合集
    * 在moudted中监听白名单和黑名单的变动，然后实时的删除
    * 在destoryed时，删除cache中的vnode实例，删除缓存要执行实例的destory钩子函数
    * 缓存步骤：
        * 1.获取keep-alive中包裹的组件对象已经名称
        * 2.根据设置的白名单查看组件是否需要缓存，不匹配直接返回组件实例Vnode，否则进行缓存
        * 3.根据组件id和tag生成缓存key，并在缓存对象中查看是否缓存过组件实例，如果存在直接更新该key在this.keys中的位置（更新key的位置时LRU算法的关键）
        * 4.在this.cache中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max值，超过通过LRU算法删除，最近最久未使用的组件
        * 5.最后将该组件的keepalive属性设置为True
    * vue渲染过程：
        * init=>$mounted=>compile=>render=>vnode=>patch=>DOM
        * vue在渲染时会调用原型上的_render函数将组建转换成一个vnode实例，而_render是调用createElement、createElementVnode两个函数做实例转化
        * 完成Vnode实例化后，这时候Vue调用原型上的_update函数把Vnode渲染成真实DOM，这个过程通过path函数完成
        * 在加载被包裹组件时，根据虚拟dom的compoenntinstanceof和keep-alive值判断是否有缓存，如果没有缓存会限制性keep-alive的render函数，通过render函数将被包裹组件进行缓存
        * 再次访问被包裹组件，vnode.componentInstance的值，已经是缓存组件的实例了，直接把上一次的dom插入到了父元素中
    * keep-alive不生成DOM：
        * vue在初始化生命周期为父子组件建立生命周期时根据abstract会忽略某个组件
    * 只执行一次钩子：
        * 由于被缓存组件设置了keep-alive并且已有组件缓存了，不再进入到$mount过程中，所以create、mouted生命周期不执行
        * 在path的最后阶段会调用组件自身的actived函数

> 18.minx和extend

* mixin
    * 使用：可以在vue实例上混入options，可以混入到全局，每个实例都会有
    * 原则：
        * 实例和mixin都有相同的data属性，以组件为准
        * 实例和mixin有同名的属性和方法一组件为准
        * 构造函数会合并都会调用，混入方法先调用
* extend：
    * 是vue的构造函数，可以创建构造函数，在里面也可以混入，是单独的实例
    * 在里面使用mixin不会对Vue造成影响
    * data必须是函数

> 19.虚拟dom和diff算法

[什么是虚拟dom](https://juejin.im/post/5d3f3bf36fb9a06af824b3e2)
[为什么不用index作为key](https://juejin.im/post/5e8694b75188257372503722)

* 虚拟dom：
    * 特点和优点：
        * 虚拟dom实际就是将真实dom通过JS对象的形式描述出来，它的创建和更改比真实dom小得多
        * 最终整个形成一颗树的结构，在发生差异化时尽可能将差异一次性的更新到dom上面，这样保证dom操作不会出现性能很差的情况
        * 现代前端框架就是无需操作dom的过程，保证dom不会出现性能很差的情况
        * 而且可以方便跨平台
    * virtual Dom是通过Vnode这么个class去描述定义的
    * Vnode包含什么：
        * 标签、属性、数据、键值
        * 映射到真实dom需要经历VNode的create、diff、path过程
        * create是通过createElement方法创建的
* 怎么转换成虚拟dom的：
    * 通过将html编程token

* diff算法：
    * diff算法的目的是找出新旧节点，之间的差异并更新
    * 如果一层层进行比较会产出O(n^3)的复杂度，现代的vn库一般都是同级比较所以复杂度只有O(N)
    * 具体算法细节：
        * 两个新旧节点子节点遍历，从头开始向尾部遍历。通过四个指针，分别判断新旧节点的子节点前和后
        * 如果子节点首节点为空向后移动，尾结点为空向前移动。新旧节点，分别进行头部和尾部比较
        * 如果同start或同end的新旧节点相同不用更新直接向前或向后移动，直接更新dom属性和子节点即可
        * 如果旧节点的start和新节点的end相同，执行path
            * oldStratVn与newEndVn相同，显然是Vnode右移了，将oldStartVn移动到oldEndVn后面
            * 若while刚开始，那移动到oldEndVn右边就是最右边，是合理的
            * 若循环不是刚开始，因为比较是两头向中间比较，那么两头的dom位置已经是合理的了，移动到oldElement的右边也是合理的
            * oldVn和vn相同才patch，且oldVn自己对应的dom总是存在的，vn的dom是不存在的，直接复用oldVn对应的dom
        * 如果旧节点的endVn和新节点的startVn相同执行patch，左移更新后的dom
        * 四个Vn都不相同
            * 从oldCh建立index->的map
            * 只处理newStartVn，以它的key和从上面的map拿到的index
            * 如果index存在，那说明有对应的old vnode，patch就好了
            * 如果index不存在，那说明newStartVnode是全新的vnode，直接创建对应的dom，并插入
        * 处理未访问到的vnode
            * oldStartIdx`>`oldEndIdx,说明新的Vn可能未处理完，将新的内的Vn处理完，全部直接添加到父组件相对位置
            * 如果旧Vn内有未处理完的，直接删除
* 概念性复述：
    * 我们可以假设有旧的Vnode数组和新的Vnode数组这两个数组,而且有四个变量充当指针分别指到两个数组的头尾.
    * 重复下面的对比过程，直到两个数组中任一数组的头指针超过尾指针，循环结束
    * 头头对比: 对比两个数组的头部，如果找到，把新节点patch到旧节点，头指针后移
    * 尾尾对比: 对比两个数组的尾部，如果找到，把新节点patch到旧节点，尾指针前移
    * 旧尾新头对比: 交叉对比，旧尾新头，如果找到，把新节点patch到旧节点，旧尾指针前移，新头指针后移
    * 旧头新尾对比: 交叉对比，旧头新尾，如果找到，把新节点patch到旧节点，新尾指针前移，旧头指针后移
    * 利用key对比: 用新指针对应节点的key去旧数组寻找对应的节点,这里分三种情况,当没有对应的key，那么创建新的节点,如果有key并且是
    * 相同的节点，把新节点patch到旧节点,如果有key但是不是相同的节点，则创建新节点

* render函数如何生成的

> 20.vue高阶组件

* [vue高阶组件](https://juejin.im/post/5e8b5fa6f265da47ff7cc139)
* [编写vue高阶组件](https://juejin.im/post/5dda5f746fb9a07ac468b959)

* 高阶组件时什么：
    * 一个函数接收一个组件，将组件包装后返回
    * 在vue中，组件时一个对象，函数接收一个对象，返回一个新的对象

> 21.directives指令

* vue可以通过directives复用一些公关逻辑
* 生命周期：
    * bind、inserted、update、componentUpdate、unbind

> 22.vue-router生命周期

* beforeRouterEnter：路由进入该组件调用
* beforeRouterLeave：离开时调用
* beforeRouterUpdate：路由更新是调用，同一个组件多个页面使用


> 23.slot

* 获取slot内容，`this.$slots`，获取插槽内容
* 在内部`:name="val"`传入值给上层模板，通过`slot-scoped`获取值

