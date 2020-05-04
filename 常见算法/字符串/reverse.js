

function reverse(num){
    var arr = String(num).split('');
    console.log(arr);
    
    var flag = arr[0]==='-'?arr.shift():'';
    var start = 0;
    var end = arr.length-1;
    var temp = null;
    while(start<=end) {
        temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    if(flag) arr.unshift(flag);
    return Number(arr.join(''));
}

function reverse(num){
    var arr = String(num).split('');
    var flag = arr[0]==='-'?arr.shift():'';
    arr.reverse();
    if(flag) arr.unshift(flag);
    return parseInt(arr.join(''),10);
}

console.log(reverse(-200))