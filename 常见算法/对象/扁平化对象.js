// let obj = {
//     "a": {
//         "b": {
//             "c": {
//                 "d": 1
//             }
//         }
//     },
//     "aa": 2,
//     "c": [
//         1,
//         2
//     ]
// };

// function flatObj (obj){
//     Object.keys(obj).forEach((key)=>{
        
//     })
// }

// console.log(flatObj(obj))

// //  =>
// // { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }


// // const sear = (obj, newObj = {}, key) => {
// //     if (typeof obj !== 'object' || obj === null) {
// //         newObj[key] = obj;
// //         return newObj;
// //     } else {
// //         const isArray = Array.isArray(obj);
// //         for (let i in obj) {
// //             let useKey = '';
// //             if (key) {
// //                 if (isArray) {
// //                     useKey = key + '[' + i + ']';
// //                 } else {
// //                     useKey = key + '.' + i;
// //                 }
// //             } else {
// //                 useKey = i;
// //             }
// //             sear(obj[i], newObj, useKey);
// //         }
// //         return newObj;
// //     }
// // }

// const sear = function(obj,newObj={},key){
//     if(typeof obj !== 'object' || obj ===null) {
//         newObj[key] = obj;
//         return newObj;
//     } else {
//         let isArray = Array.isArray(obj);
//         let useKey = '';
//         for (var i in obj) {
//             if (key) {
//                 if (isArray) {
//                     useKey = key + `[${i}]`;
//                 } else {
//                     useKey = key + '.' + i;
//                 }
//             } else {
//                 useKey = i;
//             }
//             sear(obj[i],newObj,useKey);
//         }
//         return newObj;
//     }
// }

// console.log(
//     sear(
//         {
//             "a": {
//                 "b": {
//                     "c": {
//                         "d": 1
//                     }
//                 }
//             },
//             "aa": 2,
//             "c": [
//                 1,
//                 2
//             ]
//         }
//     )
// );


/*
## 题目1: 实现函数parseCoord，给定Excel单元格字符串，输出对应的行列值。

## 样例
样例一
输入：parseCoord('A1')
输出：{ col: 1, row: 1 }

样例二
输入：parseCoord('AB123')
输出：{ col: 28, row: 123 }
*/
// function parseCoord(coord) {
//     let reg = /([a-z]*)([0-9]*)/i;
//     let res = coord.match(reg);
//     let col = res[1].toUpperCase();
//     let row = res[2];
//     let cols = col.split('');
//     let num = 0;
//     for (let i = cols.length - 1, j = 1; i >= 0; i--, j *= 26) {
//         // 
//         num += (cols[i].charCodeAt() - 64) * math.pow();
//     }
//     return {
//         col: num,
//         row: parseInt(row)
//     };
// }

function parseCoord(coord) {
    let reg = /([a-z]*)([0-9]*)/i;
    let res = coord.match(reg);
    let col = res[1].toUpperCase();
    let row = res[2];
    let cols = col.split('');
    let num = 0;
    for (let i = cols.length - 1; i >= 0; i--) {
        num += (cols[i].charCodeAt() - 64) * Math.pow(26, cols.length-i);
    }
    return {
        col: num,
        row: parseInt(row)
    };
}

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
    function sear(obj, newObj = {}, key) {
        if (typeof obj != 'object') {
            newObj[key] = obj;
            return newObj;
        } else {
            let isArray = Array.isArray(obj);
            let useKey = '';
            for (let i in obj) {
                if (key) {
                    if (isArray) {
                        useKey = key + `[${i}]`;
                    } else {
                        useKey = key + '.' + i;
                    }
                } else {
                    useKey = i;
                }
                sear(obj[i], newObj, useKey);
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