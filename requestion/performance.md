
## 目录

* [编写时优化](#编写时优化)
* [框架层面优化](#框架层面优化)
* [SSR](#SSR)
* [性能监控](#性能监控)
* [白屏时间和首屏时间](#白屏时间和首屏时间)

## 内容

> 1.编写时优化

<a name="编写时优化"></a>

* 重绘和重排
    * 减少不必要的重绘和重排
    * 复杂动画效果的元素让其脱离文档流不要影响父元素和后续元素
    * 不要在多次更改中获取元素宽高位置信息，否则浏览器会立即触发重绘和重排，为获取到准确的dom信息
    * 缓存dom宽高信息，避免读写操作混合，先统一读后续统一写
    * display: none，不可见元素不影响重绘和重排
    * visibility: hidden，只会引起重绘不会引起重排
    * 使用`document fragment`将DOM更改一次性写入

> 2.框架层面优化

<a name="框架层面优化"></a>

* 首屏优化：
    * app根节点，增加loading内容，svg。通过html-webpack-plugin增加loading
    * 使用骨架page-skeleton-plugin
    * 将常用的图片使用base64，并存入localstorage中，下次直接去localstorage内容
* 代码减少：
    * 去除构建中的polyfill，使用polyfillcdn资源，根据浏览器确定是否需要polyfill
    * splitChunkPlugin，提取公共部分，避免重复依赖
    * tree sharking，减少未使用代码
    * 支持type="module"适用es2015标准的代码，否则使用nomodule加载代码
* 动画加速：
    * 动画通过硬件加速，transform，动画绘制会放在GPU上不受主进程影响
    * requestIdleCallback分割长任务，避免长时间阻塞
    * requestAnimationFrame:
        * 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
        * 如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销
* http:
    * http缓存除html的基础资源，资源名称都携带hash值
    * 减少http请求数量，减少请求资源大小
    * 减少cookie大小
    * 合理增加域名，一个域名最多TCP连接六个
    * 升级http到2.0
* 图片：
    * jpg:图片质量高，不支持透明
    * png:支持透明，
    * webp压缩好，ios webView不支持
    * 图片懒加载
    * 图片合并，css精灵
* 加载顺序：
    * css页面骨架放在head中
    * javascript放在body底部

> 3.SSR

<a name="SSR"></a>

* 原理：
    * 搭建一个node服务，通过`vue-server-renderer`将vue实例转化为html，将html返回
    * vue服务端渲染，将源码通过webpack打包出两个bundle，其中server bundle是给服务端用的，另一个是给client bundle是给客户端用的，服务端只是生成首屏页面所需要的html，后期的交互和数据处理还是通过支持浏览器的Client bundle来完成的
* 实现：
    * 为保证每个用户都能得到一份新的实例，避免状态污染，所以通过工厂函数暴露一个实例
    * 客户端在路由解析完成时挂载到app节点上
    * asyncData，在路由切换前，获取asyncData中的数据，拿到数据或失败后路由返回
* 分类：
    * 分为服务端入口和客户端入口
    * 服务端入口返回new后的vue实例
    * 客户端需要将实例挂载到el上
* 后端获取数据：



> 4.性能监控

<a name="性能监控"></a>

[性能监控](https://juejin.im/post/5b7a50c0e51d4538af60d995)
[性能优化](https://juejin.im/post/5b6fa8c86fb9a0099910ac91)

* 获取页面加载数据

```js
var t = performance.getEntriesByType('resource')[0]
console.log(t);
console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))
```


> 5.白屏时间和首屏时间

<a name="白屏时间和首屏时间"></a>

[计算白屏、首屏时间](https://juejin.im/post/5df4294d518825128306cd5c)

* 白屏事件，在head开头记录时间戳，结尾记录时间戳。
* 用于计算首个内容加载的时间

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>白屏时间</title>
    <script>
        // 开始时间
        window.pageStartTime = Date.now();
    </script>
    <link rel="stylesheet" href="">
    <link rel="stylesheet" href="">
    <script>
        // 白屏结束时间
        window.firstPaint = Date.now()
        console.log('白屏时间',window.firstPaint-window.pageStartTime)

        // 首屏时间
        window.addEventListener('DOMContentLoaded',function(){
            // 首屏结束时间
            window.firstScreen = Date.now()
            console.log('白屏时间',window.firstScreen-window.pageStartTime)
        })
    </script>
</head>
<body>
    <div>123</div>
</body>
</html>

 <!-- 白屏时间 = firstPaint - pageStartTime -->
```

* 首屏时间 = 白屏时间 + 首屏渲染时间

