// var timer = null;
// var ids = [];
// function getUserInfoById(id, wait = 10) {
//     if (!timer) {
//         ids[0] = id;
//         timer = setTimeout(() => {
//             timer = null;
//             getUserInfo(ids).then(
//                 (data) => {
//                     ids = []
//                     console.log('result', data);
//                 }
//             )

//         }, wait);
//     } else {
//         ids.push(id);
//     }
// }

// function getUserInfo(ids) {
//     return new Promise((resolve) => {
//         let result = [];
//         for (let i = 0; i < ids.length; i++) {
//             result.push(ids + 'result')
//         }
//         resolve(result)
//     })
// }

// getUserInfoById(3)
// setTimeout(() => {
//     getUserInfoById(4)
// }, 10);


//line=readline()
//print(line)

// let add = (() => {
//     let val = 0;
//     function fn(n) {
//         val = val + n;
//         return fn;
//     }
//     fn.val = function () {
//         return val;
//     }
//     return fn;
// })()

// function isStringValid(str) {
//     var map = {
//         '[': ']',
//         '{': '}',
//         '(': ')';
//     }
//     var stack = [];
//     var index = 0;
//     var nStr str.replace(/[^\{\}\[\]\(\)]/g, '')
//     while (index < nStr.length) {
//         let nS = nStr[index];
//         if (map[nS]) {
//             stack.push(nS);
//         } else {
//             let popStr = stack.pop();
//             if (map[popStr] !== nS) return false;
//         }
//     }
//     if (stack.length === 0) {
//         return true;
//     } else {
//         return false;
//     }
// }

// body, html{
//     height: 100 %;
// }
// .content{
//     position: fixed;
//     width: calc(100 % - 40px);
//     height: 50 %;
//     display: flex;
//     justify - content: center;
//     align - items: center;
// }
// <div class="content"></div>

// resize

// htmlFontSize = screenWidth / 750 * 100;

// 1.loader，拿到css
// 2.把css内容转成ast，把px单位内容
// 3.转换成100px => 1rem，以750为基准
// 4.页面htmlFontSize = screenWidth / 750 * 100 + 'px';
