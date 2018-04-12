/**
 * csrf是代替用户完成指定操作，需要知道客户端页面的代码。而xss呢是获取用户的数据，不需要知道页面代码和数据包
 *
 * csrf跨站伪造请求了，就是攻击者使用你的身份去发送恶意的请求，从而可以利用你的账号购买商品、发送邮件
 *
 * 主要是:
 * 用户在登陆了网站a后，浏览器返回并在本地存储了cookie
 * 用户在网站a看到了不安全的网站b链接，
 * 这个链接指向一个含有iframe的标签，并且发送了http请求给网站a的服务端，
 * 因此会携带cookie这时服务端将会认为网站a的用户发起了操作
 *
 * 简单级别攻击:
 *
 * 我在网站a发布了一篇网站这个文章的img是隐藏的并且src指向的是网站a服务器的地址，
 * 并且携带了query参数，这时将发送http请求
 *
 * 高级的csrf攻击:
 *
 * 在网站a中插入一个链接这个链接是指向攻击者网站的一个页面，这个页面添加了iframe,
 * 这个iframe发送了http请求到a网站的服务器这个时候服务器接收到了请求验证后确定是用户攻击成功
 *
 *
 * 防范:
 * 通过增加token验证唯一用户，
 * 或者验证码
 * 内容加密
 */