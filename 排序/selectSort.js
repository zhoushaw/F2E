function selectSort(arr){
    if(arr.length==0||arr.length==1){
        return arr;
    }
    var maxIndex = 0;
    var currMax = 0;
    var temp = null;
    for(var i=0;i<arr.length;i++){
        currMax = arr.length-1-i;
        maxIndex = 0;
        for(var j=0;j<arr.length-i;j++){
            if(arr[j]>arr[maxIndex]){
                maxIndex = j;
            }
        }
        temp = arr[maxIndex];
        arr[maxIndex] = arr[currMax];
        arr[currMax] = temp;
    }
}


let arr = [123,43,231,4,5,2,1245,5,21,56,8,12];
console.log(selectSort(arr));