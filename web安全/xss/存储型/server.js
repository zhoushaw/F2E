const http = require('http');
function handleReequest(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.writeHead(200, { 'Content-Type': 'application/javascript; charset=UTF-8' });
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write('<script>eval("alert(document.cookie)")</script>');
    res.end();
}

const server = new http.Server();
server.listen(8111, '127.0.0.1');
server.on('request', handleReequest);


// "__mgjuuid=074bc830-6b98-4082-924a-a3eb91cc0e2a; _mwp_h5_token_enc=97079b77858287a742ff0e60801752a3; _mwp_h5_token=3cc02aa57c46f6937dabc04353696cab_1588133540347; __mogujie=KFcgeCfOZFqkXC0DKiwn0wibHKeqnm7%2F5lEFJd6rg8q9hBzg4y43SC0SnAXjPAyIvbuKIDhRPJnlgOBMXnOdfw%3D%3D; __ud_=1b0ktuu; __mgjref=http%3A%2F%2Fwww.mogujie.com%2F; __must_from=70001100_"
// 获取用户的cookie，然后手动注入
// var cookies = document.cookie;
// var nCookies = cookies.split(';').map(item => {
//     let info = item.split('=');
//     return `document.cookie="${info[0]}=${info[1]};domain=.mogu.com;"`
// })
// nCookies.forEach((cookie) => {
//     eval(cookie)
// })