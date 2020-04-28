var http = require('http');
var fs = require('fs');
var url = require('url');

process.env.TZ = 'Europe/London';

let tag = '123456';

http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log(pathname.substr(1).split('.')[1]);
    
    console.log("Request for " + pathname + " received.");
    const fileMap = {
        'js': 'application/javascript; charset=utf-8',
        'html': 'text/html',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'gif': 'image/gif',
        'ico': 'image/*',
        'manifest': 'text/cache-manifest',
        'css': 'text/css'
    }
    fs.readFile(pathname.substr(1), function (err, data) {
        if (request.headers['if-none-match'] === tag) {
            response.writeHead(304, {
                'Content-Type': fileMap[pathname.substr(1).split('.')[1]],
                // 'Expires': new Date(Date.now() + 30000),
                // 'Cache-Control': 'max-age=0, no-cache, public',
                'ETag': tag,
                'Last-Modified': new Date(Date.now() - 30000),
                'Vary': 'User-Agent'
            });
        } else {
            response.writeHead(200, {
                'Content-Type': fileMap[pathname.substr(1).split('.')[1]],
                // 'Cache-Control': 'max-age=0, no-cache, public',
                // 'Expires': new Date(Date.now() + 30000),
                'ETag': tag,
                'Last-Modified': new Date(Date.now() - 30000),
                'Vary': 'User-Agent'
            });
            response.write(fs.readFileSync(pathname.substr(1)));
        }
        response.end();
    });
}).listen(8081);
console.log('server is running 8081');
