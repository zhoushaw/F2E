
* [node进程与线程](https://juejin.im/post/5d43017be51d4561f40adcf9)
* [node-interview](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)

> 1.pm2

* 功能：
    * 进程守护
    * 负载均衡
    * 自动重启
* 命令行：
    * --watch：监听应用目录的变化，一旦发生变化，自动重启。
    * -i  or --instance：启用多少个实例，可用于负载均衡，如果 -i 0 或者 -i max，则根据当前机器核数确定实例数目。
    * --ignore-watch：排除监听的目录或文件，可以是特定的文件名，也可以是正则。
    * -n  or --name：应用的名称，查看应用信息的时候可以用到。
    * -o or --output path：标准输出日志文件的路径。
    * -e or --error path：错误输出日志文件的路径。

```javascript
pm2 start app.js --watch -i max -n first_app
```

* 重启：
    * `pm2 restart app.js`
* 停止：
    * 停止指定应用：`pm2 stop app_name | app_id`
    * 停止全部：`pm2 stop all`
* 删除：
    * 删除特定应用：`pm2 delete app_name | app_id`
    * ` pm2 delete all`
* 查看进程： `pm2 list`
* 查看某个进程的信息：`pm2 descripe app_name | app_id`
* 超过使用内存自动重启：`pm2 start app.js --max-memory-restart 100M`
* 配置文件：
    * 配置与运行：
        * 1.配置`pm2.json`配置文件
        * 2.`package.json`script中配置`"pm2": "pm2 start pm2.json" `
        * 3.`npm run pm2`就可以运行了
    * 配置内容：
        * [详细配置地址](https://pm2.keymetrics.io/docs/usage/application-declaration/#declaration-via-js-json-or-json5-file)
```json
{
    "apps": {
        "name": "express_project",       // 项目名          
        "script": "app.js",              // 执行文件
        "cwd": "./",                     // 根目录
        "args": "",                      // 传递给脚本的参数
        "interpreter": "",               // 指定的脚本解释器
        "interpreter_args": "",          // 传递给解释器的参数
        "watch": true,                   // 是否监听文件变动然后重启
        "ignore_watch": [                // 不用监听的文件
            "node_modules",
            "public"
        ],
        "exec_mode": "cluster_mode",     // 应用启动模式，支持 fork 和 cluster 模式
        "instances": "max",              // 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
        "error_file": "./logs/app-err.log",         // 错误日志文件
        "out_file": "./logs/app-out.log",           // 正常日志文件
        "merge_logs": true,                         // 设置追加日志而不是新建日志
        "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
        "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
        "max_restarts": 30,                         // 最大异常重启次数
        "autorestart": true,                        // 默认为 true, 发生异常的情况下自动重启
        "restart_delay": "60",                       // 异常重启情况下，延时重启时间
        "env": {
           "NODE_ENV": "production",                // 环境参数，当前指定为生产环境
           "REMOTE_ADDR": ""               
        },
        "env_dev": {
            "NODE_ENV": "development",              // 环境参数，当前指定为开发环境
            "REMOTE_ADDR": ""
        },
        "env_test": {                               // 环境参数，当前指定为测试环境
            "NODE_ENV": "test",
            "REMOTE_ADDR": ""
        }
    }
}
```

> 2.Cluster

* 前置知识：
    * 进程：资源分配的最小单位，一个进程可以包括多个线程
    * 线程：资源调度的最小单位，一个线程只能隶属于一个进程
    * 单线程就是一个进程只开一个线程
    * 多进程就是进程的复制
    * node.js是基于单线程事件驱动的、异步非阻塞模式，可以用于高并发场景，避免了线程创建、线程之前上下文切换所产生的花销
    * 父进程与子进程实际上是：master/worker的工作模式，利用主进程创建子进程，并分发任务给子进程
    * 通常主进程用于处理同步任务，将异步任务分发给子进程处理
    * 开启多进程不是为了解决高并发，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。

* 出现：
    * cluster模块的出现就是为了解决 Node.js 实例单线程运行，无法利用多核 CPU 的优势而出现的
    * Node.js worker 进程由child_process.fork()方法创建，这也意味存在着父进程和多个子进程
* 使用：
    * 通过child_process.fork()创建子进程
    * 通过cluster.isMaster判断当前是否主进程
    * REUSEPORT让多个进程可以监听同一个端口
    * 通过IPC进行通信
    * 两种分发连接的方式：
        * 主进程监听端口，接收到请求后通过时间片轮转法决定将客户端的socket句柄交给指定的worker处理，交给哪个worker取决于轮转算法
        * 由主进程创建socket监听端口后，将socket句柄直接分配给对应的worker，由对应的woker接收并处理
    * 为什么
* 创建多个子进程

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  for (var i = 0, n = os.cpus().length; i < n; i += 1) {
    cluster.fork();
  }
} else {
   // 启动程序 
}
```

* 子进程与父进程联系：
    * 子进程和父进程具有相同的代码段、数据段、堆栈*
    * 但是它们的内存空间不共享
    * 父进程（即 master 进程）负责监听端口，接收到新的请求后将其分发给下面的 worker 进程
    * 这里涉及三个问题：父子进程通信、负载均衡策略以及多进程的端口监听
* 进程通信：
    * 原理：他们之间通过 IPC (内部进程通信)通道实现通信
    * 通信的几种方式：
        * 共享内存 不同进程共享同一段内存空间
        * 消息传递 这种模式下，进程间通过发送、接收消息来实现信息的同步
        * 信号量 信号量简单说就是系统赋予进程的一个状态值，未得到控制权的进程会在特定地方被强迫停下来，等待可以继续进行的信号到来
        * 管道 管道本身也是一个进程，它用于连接两个进程，将一个进程的输出作为另一个进程的输入
    * Node.js 为父子进程的通信提供了事件机制来传递消息

> 3.进程守护

* 普通的进程当用户退出终端后就会直接关闭，&符号将进程放入后台，之后会由于会话session组而被回收而终止进程
* 守护进程并不依赖终端进程，不会因为终端进程退出

* 创建进程守护的过程：
    * 主进程通过fork创建子进程，主进程终止，让子进程继续在后台运行
    * 调用setsid使子进程成为新会话组长和新的进程组长，同时失去控制终端
    * 忽略SIGHUP信号（主进程终止会通知其他进程终止）
    * 调用fork再创建子进程，子进程终止，子子进程继续执行
[node实现进程守护](https://cnodejs.org/topic/57adfadf476898b472247eac)

> 4.Koa中间件实现

* 在创建完koa实例时，通过use函数将所有的中间件推入中间件数组中
* 剥洋葱模型能让所有中间件依次执行，每执行完一个中间件通过next将控制权交个下一个中间件
* 下一个中间件的next参数是compose函数关键

* compose函数通过对中间件数组中的函数从后向前遍历
* 最后一个函数的next是一个空的promise
* 前一个函数的next，是后封装了async await执行后的函数，并将ctx绑定到当前中间件
* 当next执行完就会去执行下一个中间件

* 其实就是一个链式反向递归模型的实现
* 从最大数开始循环的，将中间件从最后一个开始封装
* 每一次都是将自己的执行函数封装成next当做上一个中间件的next参数
* 这样当循环到第一个中间件的时候，只需要执行一次next()
* 就能链式的递归调用所有中间件，这个就是koa剥洋葱的核心代码机制
