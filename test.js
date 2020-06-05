
// let obj = {
//     '0': 0,
//     '1': 1,
//     '2': 2,
//     [Symbol.iterator] () {
//         var current = this;
//         let index = 0;
//         return {
//             next: function () {
//                 if(typeof current[index]!=='undefined'){
//                     return {
//                         value: current[index++],
//                         done: false
//                     }
//                 } else {
//                     // index = 0;
//                     return {
//                         done: true
//                     }
//                 }
//             }
//         };
//     }
// };

// // for (item of obj) {
// //     console.log(item);
// // }

// // for (item of obj) {
// //     console.log(item);
// // }

// // console.log(Array.from(obj))
// // function fn(){
// //     console.log(arguments);
// //     for(item of arguments){
// //         console.log(item);
// //     }
// // }
// // fn(12,12,3);


// function createIncrement(i){
//     let value = 0;
//     function increatement(){
//         value += i;
//         console.log(value);
//         const message = `current message is ${value}`
//         return function (){
//             console.log(message);
//         }
//     }
//     return increatement;
// }


// const inc = createIncrement(1);
// const log = inc();
// inc();
// inc();
// log();
// console.log('到这里了')

// const http = require('http');
// const url = require('url');
// const net = require('net');

// let httpTunnel = new http.Server();
// // 启动端口
// let port = 6789;

// httpTunnel.listen(port, () => {
//     console.log(`HTTP中间人代理启动成功，端口：${port}`);
// });

// httpTunnel.on('error', (e) => {
//     if (e.code == 'EADDRINUSE') {
//         console.error('HTTP中间人代理启动失败！！');
//         console.error(`端口：${port}，已被占用。`);
//     } else {
//         console.error(e);
//     }
// });

// // https的请求通过http隧道方式转发
// httpTunnel.on('connect', (req, cltSocket, head) => {
//     // connect to an origin server
//     var srvUrl = url.parse(`http://${req.url}`);

//     console.log(`CONNECT ${srvUrl.hostname}:${srvUrl.port}`);

//     var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
//         cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
//             'Proxy-agent: MITM-proxy\r\n' +
//             '\r\n');
//         srvSocket.write(head);
//         srvSocket.pipe(cltSocket);
//         cltSocket.pipe(srvSocket);
//     });
//     srvSocket.on('error', (e) => {
//         console.error(e);
//     });
// });

// function multi(str1, str2) {
    
// }


// function parseCoord(coord) {
//     let reg = /([a-z]*)([0-9]*)/i;
//     let res = coord.match(reg);
//     let col = res[1].toUpperCase();
//     let row = res[2];
//     let cols = col.split('');
//     let num = 0;
//     for (let i = cols.length - 1; i >= 0; i--) {
//         num += (cols[i].charCodeAt() - 64) * Math.pow(26, cols.length - i-1);
//     }
//     return {
//         col: num,
//         row: parseInt(row)
//     };
// }

// console.log(parseCoord('AB123'))


// function flatten(input) {
//     function sear(obj, newObj = {}, key) {
//         if (typeof obj != 'object') {
//             newObj[key] = obj;
//             return newObj;
//         } else {
//             let isArray = Array.isArray(obj);
//             let useKey = '';
//             for (let i in obj) {
//                 if (isArray) {
//                     useKey = key + `[${i}]`;
//                 } else {
//                     if (key) {
//                         useKey = key + '.' + i;
//                     } else {
//                         useKey = i;
//                     }
//                 }
//                 sear(obj[i], newObj, useKey);
//             }
//             return newObj;
//         }
//     }
//     return sear(input);
// }

// function flatten(input) {
//     function sear(obj, newObj = {}, key) {
//         if (typeof obj != 'object') {
//             newObj[key] = obj;
//             return newObj;
//         } else {
//             let isArray = Array.isArray(obj);
//             let useKey = '';
//             for (let i in obj) {
//                 if (key) {
//                     if (isArray) {
//                         useKey = key + `[${i}]`;
//                     } else {
//                         useKey = key + '.' + i;
//                     }
//                 } else {
//                     if (isArray) {
//                         useKey = `[${i}]`;
//                     } else {
//                         useKey = i;
//                     }
//                 }
//                 sear(obj[i], newObj, useKey);
//             }
//             return newObj;
//         }
//     }
//     return sear(input);
// }



// var input = {
//     a: 1,
//     b: [1, 2, { c: true }, [3]],
//     d: { e: 2, f: 3 },
//     g: null,
// }

// console.log(flatten(input));
// console.log(flatten([0,1,2]));

function parseCoord(coord) {
    // 匹配行和列
    let reg = /([a-z]*)([0-9]*)/i;
    let res = coord.match(reg);
    let col = res[1].toUpperCase() || 'A';
    let row = res[2] || 0;

    col = col.split('').reduce((pre,next,index)=>{
        return pre + (next.charCodeAt() - 64) * Math.pow(26,col.length-index-1);
    },0)

    return {
        col,
        row: parseInt(row)
    };
}
console.log(parseCoord('ab22'))



/**
 * 题目2： 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null, 
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */
function flatten(input) {
    function sear(obj,newObj = {},key){
        if(typeof obj !=='object' || obj === null){
            newObj[key] = obj;
            return newObj;
        } else {
            let isArray = Array.isArray(obj);
            let useKey = '';
            for (let i in obj) {
                if(isArray){
                    useKey = (key || '') + `[${i}]`;
                } else {
                    useKey = key ? key + '.': '' + `${i}`
                }
                sear(obj[i],newObj,useKey)
            }
            return newObj;
        }
    }
    return sear(input);
}



var input = {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null,
}

console.log(flatten(input));
console.log(flatten([0,1,2]));

