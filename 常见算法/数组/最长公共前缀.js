var arr = ['aaafsd', 'aawwewer', 'aaddfff'];

// function getMaxStr (arr) {
//     var minStr = arr[0];
//     var minLen = arr[0].length;
//     var minCommon = '';
//     var start = 0;
//     for(var item of arr) {
//         if(item.length<minLen) {
//             minStr = item;
//             minLen = item.length;
//         }
//     }

//     while (start <= minLen) {
//         var getStr = minStr.substring(0, start);
//         for(var index in arr) {
//             var nStr = arr[index];
//             var preFix = nStr.substring(0,start);
//             if (preFix!==getStr) {
//                 return minCommon;
//             }
//         }
//         minCommon = getStr;
//         start++;
//     }
//     return getStr;
// }

function getMaxStr (arr) {
    var minStr = arr[0];
    var minLen = arr[0].length;
    var minCommonStr = '';
    var start = 1;
    for(var item of arr){
        if(item.length<minLen) {
            minStr = item;
            minLen = item.length;
        }
    }

    while(start<=minLen) {
        var getStr = minStr.substring(0,start);
        for(var index in arr) {
            var preFix = arr[index].substring(0,start);
            if(preFix!==getStr) {
                return minCommonStr;
            }
        }
        minCommonStr = getStr;
        start++;
    }
}
console.log(getMaxStr(arr));
