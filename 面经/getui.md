1、 双向绑定的其他方式实现：手动绑定、脏数据轮训、数据劫持

2. webpack loader 和plugin区别， loader执行顺序

   * Loader 让webpack可以处理那些非javascript文件（webpack 自身只理解 JavaScript）。loader可以将所有类型的文件转化为webpack能够处理的有效模块，然后可以利用webpack的打包功能对他进行处理
   * loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。[插件接口](https://www.webpackjs.com/api/plugins)功能极其强大，可以用来处理各种各样的任务。
   * loader执行顺序是从右向左执行

3. hook为什么在for循环里不能用

4. 介绍redux和vuex机制

5. const一个对象的是值可以改吗？ 为什么

   const指向一个对象的时候，是指向对象引用地址。仅保证指针不发生改变，修改对象的属性不会改变对象的指针，所以是被允许的。也就是说const定义的引用类型只要指针不发生改变，其他的不论如何改变都是允许的。

6. JSBridge实现机制

7. dns在什么阶段访问cdn

   step1：用户向localDNS发起请求查询输入域名对应的IP地址（若有缓存直接返回，否则去rootDNS查询）；

   step2：localDNS迭代向rootDNS查询，逐级迭代,rootDNS=>顶级DNS=>权限DNS；

   step3：获得权限DNS后，localDNS向权限DNS发起域名解析请求；

   step4：权限DNS通常会将域名CNAME【如果有有CNAME则解析CNAME对应的CDN服务，否则的话默认为普通请求，直接返回解析到的IP】到另一个域名，这个域名最终会被指向CDN网络中的智能DNS负载均衡系统；

   step5：DNS负载均衡系统通过一些智能算法，将最合适的CDN节点IP地址返回给localDNS；

   step6：localDNS将获得的IP地址返回给用户；

   step7：用户得到节点的IP地址后，向该节点发起访问请求；

   step8：CDN节点返回请求文件，如果该节点中请求的文件不存在，就会再回到源站获取这个文件，然后返回给用户。

8. Tree-shaking使用条件

   tree-shaking依赖es6的模块引入或输出语法。

9. es5和es6的继承区别

10. 自己实现webpack的loder\plugin, 如何实现

11. Keep-alive了解吗

12. babel6/babel7区别

13. babel打包之后打包成什么

14. vuex优缺点

15. flex实现一个九宫格

 ```
<!DOCTYPE dtd>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		.p{
			display: flex;
			flex-wrap: wrap;
			border:1px solid #eee;
			width: 300px;
			height: 300px;
		}
		.d:nth-child(2n+1){
			background: red;
			width: calc(100%/3);
			height: calc(100%/3);
		}
		.d:nth-child(2n){
			background: blue;
			width: calc(100%/3);
			height:calc(100%/3);
		}
	</style>
</head>
<body>
	<div class="p">
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
		<div class="d"></div>
	</div>
</body>
</html>
 ```



2. hot-loader机制

3. 如何构建一个组件库生态

4. 模块通信

   event机制

   - 提交某Event的模块并不知道周围谁关心此Event，只管在自己干完活之后吼一嗓子；
   - 关注某Event的模块也不知道是谁触发此Event，只管在那里等待即可。

   ```
   //全局
   project.event = new EventEmitter();
   
   //模块A
   $.ajax(..., (data) => {
   		project.data = data
   		project.event.emit('project.data.ready')
   })
   
   //模块B
   project.event.addEventListener('project.data.ready', () => {
   		var data = project.data
   })
   ```

5. 模块性能评估

6. 工程化理解

   工程化就是使前端开发路程标准化、规范化、自动化、工具化，使用规范和工具提供开发效率降低开发成本。

7. npm包安装机制

8. fiber解决什么问题，带来了什么问题，如何解决的

   https://segmentfault.com/a/1190000018250127

   在现有的React中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次；**在React Fiber中，不再是这样了，第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！**

9. 在样式优先级里伪类和伪元素的优先级

10. flex:1的表现

11. cli插件如何实现

12. cdn理解

13. https的加密解密过程

    1. 客户端发起HTTPS请求

    这个没什么好说的，就是用户在浏览器里输入一个https网址，然后连接到server的443端口。

    2. 服务端的配置

    采用HTTPS协议的服务器必须要有一套数字证书，可以自己制作，也可以向组织申请。区别就是自己颁发的证书需要客户端验证通过，才可以继续访问，而使用受信任的公司申请的证书则不会弹出提示页面(startssl就是个不错的选择，有1年的免费服务)。这套证书其实就是一对公钥和私钥。如果对公钥和私钥不太理解，可以想象成一把钥匙和一个锁头，只是全世界只有你一个人有这把钥匙，你可以把锁头给别人，别人可以用这个锁把重要的东西锁起来，然后发给你，因为只有你一个人有这把钥匙，所以只有你才能看到被这把锁锁起来的东西。

    3. 传送证书

    这个证书其实就是公钥，只是包含了很多信息，如证书的颁发机构，过期时间等等。

    4. 客户端解析证书

    这部分工作是有客户端的TLS来完成的，首先会验证公钥是否有效，比如颁发机构，过期时间等等，如果发现异常，则会弹出一个警告框，提示证书存在问题。如果证书没有问题，那么就生成一个随机值。然后用证书对该随机值进行加密。就好像上面说的，把随机值用锁头锁起来，这样除非有钥匙，不然看不到被锁住的内容。

    5. 传送加密信息

    这部分传送的是用证书加密后的随机值，目的就是让服务端得到这个随机值，以后客户端和服务端的通信就可以通过这个随机值来进行加密解密了。

    6. 服务段解密信息

    服务端用私钥解密后，得到了客户端传过来的随机值(私钥)，然后把内容通过该值进行对称加密。所谓对称加密就是，将信息和私钥通过某种算法混合在一起，这样除非知道私钥，不然无法获取内容，而正好客户端和服务端都知道这个私钥，所以只要加密算法够彪悍，私钥够复杂，数据就够安全。

    7. 传输加密后的信息

    这部分信息是服务段用私钥加密后的信息，可以在客户端被还原。

    8. 客户端解密信息

    客户端用之前生成的私钥解密服务段传过来的信息，于是获取了解密后的内容。整个过程第三方即使监听到了数据，也束手无策。

14. webpack去除没有执行到的代码是怎么去除的

15. 页面性能优化方式

    * ssr
    * gzip
    * Tree-shaking
    * js\css压缩合并
    * 非核心代码异步加载
    * 浏览器缓存
    * cdn

16. react基本原理及性能优化

    https://segmentfault.com/a/1190000015648248

17. node框架了解比如koa ，用文件都做什么

18. 如何解决promise.all的一个异常退出问题

    错误的时候不用reject，用resolve('error')

19. v-model实现原理

    其核心就是，一方面modal层通过defineProperty来劫持每个属性，一旦监听到变化通过相关的页面元素更新。另一方面通过编译模板文件，为控件的v-model绑定input事件，从而页面输入能实时更新相关data属性值。

    v-model实际上就是v-bind:value 加上oninput事件的语法糖

20. node有8个cpu如何多进程运行

    child_process

21. 中文搜索如何解决

     声明一个标记flag，在compositionstart、compositionend两个事件过程之间的时候flag值为false，在input事件中通过flag的值来判断当前输入的状态。

22. setTimeout和setInterval机制区别

23. 输入框是用的节流还是防抖

24. promise和asyn/await区别

25. # Node.js 多进程

NodeJS的JavaScript运行在单个进程的单个线程上，一个JavaScript执行进程只能利用一个CPU核心，而如今大多数CPU均为多核CPU，为了充分利用CPU资源，Node提供了`child_process`和`cluster`模块来实现多进程以及进程管理。

26. 观察者模式和发布订阅的区别

    1. 在Observer模式中，Observers知道Subject，同时Subject还保留了Observers的记录。然而，在发布者/订阅者中，发布者和订阅者不需要彼此了解。他们只是在消息队列或代理的帮助下进行通信。
    2. 在Publisher / Subscriber模式中，组件是松散耦合的，而不是Observer模式。
    3. 观察者模式主要以同步方式实现，即当某些事件发生时，Subject调用其所有观察者的适当方法。发布者/订阅者在大多情况下是异步方式（使用消息队列）。
    4. 观察者模式需要在单个应用程序地址空间中实现。另一方面，发布者/订阅者模式更像是跨应用程序模式。

    发布订阅解耦

27. vuex

    Vuex的设计思想，借鉴了Flux、Redux，将数据存放到全局的store，再将store挂载到每个vue实例组件中，利用Vue.js的细粒度数据响应机制来进行高效的状态更新。

