/**
 * 双循环遍历去重
 * 1.遍历外层数组
 * 2.将外层的每个元素，与已经添加到新列表的元素进行比较，如果外层元素与新列表的元素相同终止循环
 * 3.循环新列表的索引长度如果与新列表长度一致，表明没有重复元素，将外层遍历的元素添加至新列表
 */

function uniqueFor(arr) {
    var result = [];
    for(var i=0,arrlen=arr.length;i<arrlen;i++) {
        for (var j = 0, resultLen = result.length;j<resultLen;j++) {
            if (arr[i]==result[j]) break;
        }
        
        if (j==resultLen) {
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 * indexOf查找
 * 1.遍历外层数组
 * 2.通过数组方法indexOf查询新数组内是否存在外层数组元素
 * 3.如果不存在将元素添加至新数组
 */

function uniqueIndexOf(arr) {
    var result = [];
    for(var i = 0;i<arr.length;i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result;
}


/**
 * 排序后去重
 * 1.将数组进行排序
 * 2.如果前一项和后一项不同添加至新数组，否则反之
 */

function uniqueSort(arr) {
    var result = [];
    var newArr = arr.sort((a,b) => a-b);

    for(var i=0;i<newArr.length;i++) {
        if(arr[i]!=arr[i+1]) {
            result.push(arr[i]);
        }
    }

    return result;
}

console.log(uniqueSort([1,1,23,5,2,6,8,5,7,6]));
