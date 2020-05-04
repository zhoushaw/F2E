
> 1.electron原理


* 原理：
    * 用HTML、css、js来构建平台桌面应用的一个开源库
    * 他通过将chromium和node合并到一个运行环境中，并将其打包成mac、windows、linux系统下的应用来实现这一点
* node：
    * electron中可以使用node.js中所有的api

> 2.Spectron和Devtron

* Spectron可以用于测试页面
* Devtron用于审核页面内容

> 3.electron-packager和electron-builder

* electron-packager和electtron-builder都是用于打包electron应用
* electron-builder有更丰富的功能支持打包多平台、打包文件更轻量级、支持非electron的自动更新

> 4.electron架构

* electron分为渲染进程和主进程
    * 主进程中通过browerWindow创建页面，每个browerWindow都在自己的渲染进程中运行页面,browerWindow实例销毁后，对应的渲染进程也会被销毁
    * 渲染进程无法操控原生GUI、如果需操控需要和主进程进行通信，渲染进程的页面可以使用node的api
* 进程通信：
    * 渲染进程发送监听消息：ipcRenderer，send、on
    * 主进程发送监听消息：ipcMain、send、on
* 渲染进行直接使用主进程api:
    * 由于渲染进程是可以与主进程通过ipc进行通信的
    * 所以可以通过remote拿到主进程中的api
    * remote为中间件

> 5.host工具

* 原因：
    * 各部门之间host管理混乱，集中管理
    * 运营、产品验收困难。必须现场验收
* 实现：
    * 通过node+mongodb实现后台管理系统，部门有一个负责人（内容、商城、直播、支付）
    * 将相应系统分发给指定开发，由对应的人负责维护
    * 编辑维护等功能
* 实现客户端：
    * 可以选择启动哪些部门的host，实现环境切换
    * 通过http代理实现，host秒切
        * 在客户端起一个http代理服务器
        * 并将本机代理配置为代理服务器地址，执行命令行`networksetup -setwebproxy port localhost`
        * 拦截http请求、转发前如果配置了host
        * 将host改为配置的host地址，进行接口转发
        * 将结果转发给客户端
    * 针对https请求
        * [http隧道代理](https://zhuanlan.zhihu.com/p/28767664)
        * http客户端通过connect请求隧道代理创建一条达到任意服务器和端口的TCP连接，并对客户端和服务器之间的数据进行盲转发
        * 通过隧道进行转发，在转发前更改ip
        * 隧道可以进行转发，不能窥探和更改其他数据
* https内容拦截：
    * 生成CA根证书，并让用户信任。通过node的forge库生成CA证书并签名
    * 根据根证书生成对应域名的子证书，通过CA根证书的私钥给需要认证的子证书签名
    * 通过http的隧道，获取https请求的目标服务器的域名，用预先安装好的CA跟证书，生成对应的域名的子证书
    * 伪造一个https服务站点，通过`https`库，创建https服务配置根证书，接收到客户端请求后，进行https转发即可
    * 拿到服务端响应后进行转发