function shellSort(arr){
    if(!arr||arr.length==0||arr.length==1){
        return arr;
    }
    var buchang = 3;
    while(buchang>=1){
        for(var i=buchang;i<arr.length;i++){
            for(var j=i;j>=buchang&&arr[j-buchang]>arr[j];j-=buchang){
                swap(arr,i,j-buchang);
            }
        }
        buchang--;
    }

    return arr;
}


function swap(arr,i,j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

var arr = [1,312,45,73,13,4,5];
console.log(shellSort(arr));