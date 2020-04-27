function insertSort(arr){
    if(!arr||arr.length==0||arr.length==1){
        return arr;
    }
    var temp,index;
    for(var i=0;i<arr.length;i++){
        temp = arr[i];
        index = i-1;
        while(i>-1&&arr[index]>temp){
            arr[index+1] = arr[index];
            index--;
        }
        arr[index+1] = temp;
    }
    return arr;
}

var arr = [12,4,12,4,5,23,4,5,7,9,2];
console.log(insertSort(arr));