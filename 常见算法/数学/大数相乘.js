

// var multiply = function(num1, num2) {
//     if (num1 == "0" || num2 == "0") return "0";
//     let l1 = num1.length,
//         l2 = num2.length;
//     let res = new Array(l1 + l2 - 1).fill(0);
//     for (let i = 0; i < l2; i++) {
//         for (let j = 0; j < l1; j++) {
//             res[i + j] += +num2[i] * +num1[j];
//         }
//     }
//     console.log(res);
//     let len = res.length-1;
//     let str = '';
//     let flag = 0;
//     while(len>=0){
//         flag += +res[len];
//         str = flag%10 + str;
//         flag = Math.floor(flag/10);
//         len--;
//     }
//     return flag > 0 ? flag + str: str;
// }


// console.log(multiply('99','99'));

