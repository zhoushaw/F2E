[Cli创建](https://www.jianshu.com/p/cd9cf12d0e31)

> 1.egret-cli


* Cli作用
    * 对新开发者来说，创建、运行、打包零成本
    * 一套命令行全环境使用
    * 分类型管理项目：魔方项目、MFP项目、玩法项目，基础模板固定
    * 提供各环境的基础内容
    * 每个类型项目对应不同技术栈、node项目
    * 创建流程自定义化
        * 可以配置开发者、测试人员
        * 项目描述，业务分支
* build流程
    * 一个命令行兼容多种打包和运行
    * .meilirc内存放当前plugin
* 玩法cli插件化：
    * 快速创建游戏引擎项目，提供基础模板
    * 集成基础库，http请求封装，通用方法，打点等
    * 上传cdn资源，打包。提供发布模板，配置打包js即可

> 2.架构

* 配置现有插件
* 检查更新
    * 查询现有插件version，如果组件内不是强制更新

* 功能实现：
    * 解析commander
    * inquirer询问,拿到
```js
{
    name: '蘑方&店铺模块',
    key: 'CUBE',
    type: 'project',
    alias: 'cube-server',
    plugin: ['cube-server']
}
```

* 设计思想和Webpack的plugin类似
* 导出一个构造函数，每个函数提供、init、create、build、dev方法
* 模块导出
    * init、create、build、dev
    * init:
        * 初始化每个组件的询问选项
        * 返回配置选项，包括创建名称、技术栈，初始化。基础模板的仓库
        * 合并最终生成所有询问选项
    * create：
        * 没有初始化create，直接拉取配置仓库模板，创建.meilirc文件，包含使用插件
        * 有配置create，执行create逻辑。
        * 启动node服务，开发者选择模板，测试人员、应用伙伴
        * 创建拉取指定模板
* 创建过程：
    * 两种方式：
        * 蘑方模块，执行蘑方模块的create，是一个Promsie
        * 插件提供仓库地址，分支，拉取
        * 同步到玩法平台
* 运行
    * 

* 获取plugin
    * cli-plugin前缀的所有plugin，通过`npm/browse/keyword/`+ `cli-plugin`
    * 拿到所有plugin
* plugin存放位置：
    * 根目录位置，.meili文件夹
    * 将根文件夹内所有`cli-plugin`开头文件全部加载
    * 拿到每个文件的`package.json`,拿到plugin基础信息
* 更新plugin
    * 定义一个json文件，上一次查询时间，和更新时间


> 3.如何实现自定义插件

* 插件提供：
    * init：
        * 注册插件钩子created、dev、build
        * 提供命令行选项，选项回调中调用钩子
    * created：
        * 提供创建方法，拉取模板，创建.meilirc文件表明钩子
    * build:
        * 静态资源上传


> 4.自我问答

* 你的cli干了什么事情：
    * 我的cli是插件，提供给`meili cli`使用,
    * cli
        * 提供init（选项信息，命令行选项使用，仓库地址）
            * 初始化create、dev、build事件
            * 将事件名作为命令行、插件信息
            * 开发者在选择时会触发对应回调
        * create：
            * 启动webServer，打开页面
            * 填写信息，选择模板
            * 拉取默认模板
        * dev，运行，直接执行命令行运行
        * build，上传资源，图片压缩
* 主cli
    * 管理插件，生成json文件，
    * 每隔一天查询是否需要检查更新
    * 有版本变化，更新

    