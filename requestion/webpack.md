

> 1.你用过哪些loader，

* vue-loader，file-loader、img-loader、source-map-loader、sass-loader、css-loader、babel-loader

> 2.你用过哪些plugin

* html-webpack-plugin、webpack-bundle-analyzer

> 3.loader和plugin

* loader：
    * loader配置在module.rules中，每一个都是一个对象，包括：test(应用范围)、use数组包括（loader(使用哪些loader)、options(参数)）
* plugin：
    * plugin中单独配置，每一项是一个Plugin实例，参数通过构造函数传入

> 4.webpack构建流程

* 合并配置参数（包括shell中的参数）
* 使用合并后的参数初始化Compiler对象，加载所有插件，执行对象的run方法开始编译
* 根据entry配置，寻找所有入口
* 从入口出发，调用所有配置的loader对模块进行编译，再找到依赖该模块的模块，进行递归调用直到所有入口依赖的文件都经过了本步骤的处理
* 经过loader编译完所有的模块后，得到了每个模块被编译后的内容以及他们间的依赖关系
* 将编译后的module组合成chunk，将chunk组成文件，存放到文件系统

> 5.提高效率的插件

* webpack-marge
* size-plugin
* HotModuleReplaceMentPlugin

> 6.source-map

* sourceMap是一个文件，这个文件里面存储了，转换前代码对应的位置信息
* sourcemap的作用，打包压缩后的代码可读性和调试能力非常差，想要调试就必须要用到source-map,map文件不打开控制台是不会加载的
* 线上source-map处理方案：
    * nginx配置内网白名单，值分发给白名单用户
    * hide-source-map借助第三方sentry平台使用
    * nosource-source-map，只会显示具体的行数和错误信栈，安全性高

> 7.webpack如何模块化打包

> 8.webpack如何热更新模块

* 模块：Hot Module ReplaceMent ，模块化热更新，简称HMR。可以不用刷新浏览器，将旧的模块变成新的模块
* HRM核心，浏览器去服务端拉取更新后的模块，准确的说是chunk diff，chunk需要更新的部分。
* 实现原理：
    * 浏览器与web-dev-server之间维护了一个websock
    * 当本地的资源文件发生变化，webpack-dev-server会向客户端推送新构建的hash
    * 客户端根据hash值与上一次资源进行对比，如果发现有变化，通过ajax请求向wds请求新的资源文件列表和hash值
    * 这样浏览器就可以通过jsonp请求获取chunk的增量更新


* 浏览器和web-dev-server之间维护了一个Websocket，当本地资源发生变化时，wds会向浏览器推送更新，并带上hash，让客户端与上一次的资源进行对比，


> 9.文件指纹

* 文件指纹指的是文件名的后缀
    * hash：整个项目的hash值，与整个项目有关，只要整个项目有修改hash值就会有变化
    * chunkHash：和webpack打包的chunk有关，不同的entry会产生不同的chunkHash
    * contentHash：文件内容hash，只要文件内容不变contentHash就不变

> 10.如何让loader按照预想的顺序执行：

* 给rules添加enforce
    * pre，在所有loader前执行
    * post，在所有loader后执行

> 11.你有写过loader吗

* 我写过一个读取ejs文件，将toml配置信息转化到模板上的loader
    * 场景：
        * 我们平台提供几个基础的模板，单独的模板包，模板里面包括pc、h5
        * pc的头部、尾部相同，将pc的做一种基础模板，头部搜索，底部企业信息
    * 实现：
        * 通过固定配置信息：layout选用哪套模板，哪套ejs。ejs内包括这个环境需要的基础类库
        * 可以配置title、icon、基础css、js
        * 提供html插槽，head开始部分，结束部分。body开始部分、结束部分
* 实现一个插件
    * 插件本身就是一个构造函数，在构造函数的原型上增加apply方法
    * apply方法的第一个参数是compiler
    * 可以在compiler在通过plugin注册回调，在webpack生命周期内的某个回调执行某个操作，例如entry、loader、plugin初始化完成等生命周期注册回调
    * compiler提供的第一个参数是compliation，第二个参数是callback，异步任务执行完了调用
    * compliation代表了资源版本，当前的资源，编译生成的资源、变化文件

> 12.优化webpack的构建速度

* 使用更高版本的webpack、node
* 多进程、多实例构建：thread-loader
* 压缩代码
    * webpack-parallel-uglify-plugin
    * uglifyjs-webpack-plugin，开启parallel
    * 通过mini-css-extract-plugin提取chunk中的css到单独文件，通过css-loader开启压缩选项
* 图片压缩
    * imagemin，node处理
    * image-webpack-loader
* 缩小打包作用域：
    * exclude/include确定loader范围
    * resolve.modules，指定第三方模块的绝对路径，减少不必要的查找
    * 合理使用alias
    * noParse，对完全不需要打包的库进行忽略
    * ignorePlugin
* 基础包分离
    * 通过html-webpack-externals-plugin，将基础包通过cdn方式引入，不打入bundle中
    * 通过splitChunksPlugin提取公共脚本、基础包、页面公共文件
* DLL使用DDLPlugin进行分包，使用DLLPluginRefrencePlugin对mainfest.json进行引用，让一些基本不会改动的代码打成静态资源，避免反复编译浪费时间
* 充分利用二次缓存
    * babel-loader开启二次缓存
    * 使用cache-loader
* Tree shaking
    * 通过package.json，改变sideEffects来标明是否有副作用，项目中未使用到的代码将会移除
    * 必须使用es6语法，import export
    * 引入能删除未使用代码的工具，UglifyJsPlugin
* 只返回需要的polyfill
    * polyfill-server,只在需要polyfill的时候使用polyfill

