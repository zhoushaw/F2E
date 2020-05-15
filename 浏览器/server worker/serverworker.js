const CACHE_NAME = "fed-cache";
this.addEventListener("install", function (event) {
    this.skipWaiting();
    console.log("install service worker");
    // 创建和打开一个缓存库
    caches.open(CACHE_NAME);
    // 首页
    let cacheResources = [
        "http://localhost:8080/%E6%B5%8F%E8%A7%88%E5%99%A8/server%20worker/index.html",
        "http://localhost:8080/%E6%B5%8F%E8%A7%88%E5%99%A8/server%20worker/file.js"
    ];
    event.waitUntil(
        // 请求资源并添加到缓存里面去
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(cacheResources);
        })
    );
});

this.addEventListener("active", function (event) {
    console.log("service worker is active");
});