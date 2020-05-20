
[pikachu-攻击演示](https://github.com/zhuifengshaonianhanlu/pikachu)
[xss攻击游戏](http://prompt.ml/0)

> 1.xss攻击

* 内容：Cross-Site Scripting（跨站脚本攻击）简称 XSS
* 原理：通过注入恶意js脚本，有人打开注入了js脚本的页面，向目标服务器发送cookie、模拟用户请求接口、或者让当前页面无法展示
* 分类：
    * 反射型XSS：
        * 搜索、跳转页面携带参数，携带参数中带有script脚本，页面或服务端拿到参数后拼接到html中导致攻击
        * 将射到XSS攻击的URL发送给别人，如果那个页面点击者已经登录过，并且页面会将解析的XSS放入页面中就造成了攻击
    * 存储型：
        * 用户通过发表、评论，将带有攻击型的脚本内容提交到服务端，服务端对其进行了存储，
        * 在页面渲染对应的内容，并将其当做html内容进行渲染时，会导致脚本的执行从而引起攻击
    * DOM型XSS:
        * a标签的href中"javascript:alert('xss')"
* xss来源：
    * 用户UGC内容（user create content）
    * 来自第三方的链接
    * URL参数
    * POST参数
    * Reference
    * Cookie
* 实现：
    * 攻击者在发表端，注入js脚本，如果前端和后端都没有针对js脚本进行过滤，会将js脚本存储到后端
    * 正常用户访问到对应内容，会返回带有js脚本的内容，那么就会被攻击
* 预防：
    * 输入过滤：
        * 对于明确数据的内容进行过滤，如数字、URL、邮箱等等内容，只允许存在于类型相符的数据
        * 输入过滤并非完全可靠，防止浏览器执行恶意代码来防范
            * 防止HTML中出现注入
            * 方式JavaScript执行时，执行恶意代码
    * 输出过滤：
        * 纯前端渲染：
            * 除非必要否是不使用innerHtml输出内容
    * 前端针对用户输入信息就行过滤，后端也做一层过滤
    * 前端针对html内容，也要针对性的过滤
    * 设置cookie，httpOnly不让js获取cookie
    * 通过设置CSP，让不符合接口请求和站外内容无法加载
        * `<meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">`
        * [CSP配置](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
        * http，response Header，设置CSP
        * 可以定义加载img允许域名、script允许域名，禁止eval、禁止内联js执行，指定报告地址


> 2.CSRF

* 内容：跨站伪造请求（cross-site-request-forgery）
* 原理：攻击者诱导用户打开黑客网站，利用用户登录态发起跨站请求
* 与XSS的不同
    * CSRF攻击不需要将恶意代码注入用户页面，仅仅利用服务器和用户登录态的漏洞实施攻击
    * CSRF的攻击成本低，用户无法彻底防范
* 如何防范CSRF攻击
    * 针对实际情况设置Cookie的SameSite,设置Lax、strict
    * 服务端验证referer、origin
    * 增加token，服务端返回token，前端将其存在localstorage中、请求时放在请求头中
    * 重要修改增加二次认证
