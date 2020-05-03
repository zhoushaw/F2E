var http = require('http');

var server = http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Content-Length,Authorization,Accept,X-Requested-Width");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write('woshi')
});

server.listen(8881);

console.log('server is running');
