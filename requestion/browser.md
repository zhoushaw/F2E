
> 1.event loop

* 浏览器环境
    * 1.首先执行同步任务，遇到微任务将微任务推入微任务队列，遇到宏任务将宏任务推入队列
    * 2.同步任务执行完成，先清空微任务队列，先进先出。遇到微任务，或宏任务，继续按照步骤1走
    * 3.微任务清空完成、清空宏任务。遇到微任务，或宏任务，继续按照步骤1走
    * 微任务
        * Promise>MutationObserver
    * 宏任务：
        * setTimeout、setInterval
* node环境
    * 微任务：process.nextTick(在nextTickQueue后执行)>Promise
    * 宏任务分类：
        * timer：setTimeout、setInterval
        * poll：fs.readFile、
        * check：setImmediate
        * close: socket.on('close',...)
    * nodev12版本前：
        * 执行顺序：
            * 执行同步代码，宏任务按照任务分类从上到下执行
            * 每一个宏任务队列执行完成会清空微任务队列,宏任务未到时间的，下一次循环执行
    * nodev12版本后：
        * 执行同步代码、遇到微任务将微任务推入微任务队列，遇到宏任务将宏任务推入宏任务队列
        * 优先清空微任务队列，清空宏任务队列，按照分类从上到下清空，宏任务未到时间的，下一次循环执行

> 2.缓存

* appcache：
    * 设置：html 设置`<html manifest="list.manifest">`
    * 声明：list.manifest文件，并配置可缓存的资源
    * 缺点，控制文件失效很麻烦
* serverwork


> 3.浏览器存储

* cookie的诞生是基于http无状态的特性
    * cookie组成部分：
        * name（cookie的名称）
        * domain（cookie的生效域名）
        * value（cookie的值）
        * path（生效的路径）
        * expires、max-age（生效的时间）
        * http-only: true（只能通过http携带走cookie，不能使用js操控）
    * 跨域携带cookie：
        * withCredentials = true;
    * js操作cookie
        * 读取浏览器中的cookie
            * `console.log(document.cookie)`;
        * 写入cookie
            * `document.cookie='myname=zhoushaw;path=/;domain=.baidu.com;secure'`;
            * httpOnly只能服务端设置
            
    * 服务端设置cookie（response内有cookie字段）
        * set-cookie: `name=val;path=paths;domain=domain`
        * 设置多个cookie时，多个set-cookie
    * 特点：
        * 存储内容小，4kb左右大小
        * 设置了一定的失效时间
        * 用于解决http无状态的问题
        * cookie过多会导致http性能问题，通过cdn形式让静态资源不要携带cookie
    * 安全：
        * 用于存储用户状态
        * 可以设置为只能http请求时携带，不能js读取
        * secure，设置为只能https时携带
        * same-site,只能在同域名中携带cookie
* localstorage
    * 特点：
        * 长时间存储，下次访问网站，网站可以直接读取以前保存的数据
        * 存内容大，接近5m
        * 客户端使用，不与服务端通信
        * 接口封装较好
        * 只能存储字符串，对象要转化成字符串存储
    * 作用范围：
        * 协议、主机名、端口相同可以访问
    * 场景：
        * 存储base64位图片
* sessionstorage:
    * 特点：
        * 会话时存储，标签或浏览器关闭后清空
        * 大小5m左右
        * 仅在客户端使用，不与服务端通信
        * 接口封装较好
        * 只能存储字符串，对象要转化成字符串存储
    * 作用范围：
        * 协议、主机名、端口、窗口
    * 场景：
        * 有效维护表单数据，刷新不丢失
        * 存储本次会话的浏览足迹
* indexDB:
    * 特点：
        