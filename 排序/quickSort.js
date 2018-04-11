function quickSort(arr){
    if(arr.length==1||arr.length==0){
        return arr;
    }
    var left = [];
    var right = [];
    var middle = arr.splice(Math.floor(arr.length/2),1);
    for(var i=0;i<arr.length;i++){
        if(arr[i]<middle){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(middle).concat(quickSort(right));
}


var arr = [1,56,12,5,2,34,9,541,4,78,8,32];
console.log(quickSort(arr));