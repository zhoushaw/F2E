export function jsonp() {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        function cb1(data) {
            resolve(data);
        }
        script.src = "http://baidu.com?cb=cb1"
        document.head.appendChild(script);
    })
}