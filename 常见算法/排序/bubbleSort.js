function bubbleSort(arr){
    var temp = null;
    if(arr.length==0||arr.length==1){
        return arr;
    }
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr.length-i;j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    return arr;
}

var arr = [1,56,12,5,2,34,9,541,4,78,8,32];

console.log(bubbleSort(arr));