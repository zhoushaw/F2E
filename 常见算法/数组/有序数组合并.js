function mergeArr(arr1,arr2){
    if(!arr1){
        return arr2;
    }
    if(!arr2){
        return arr1;
    }
    var result = [];

    while(arr1.length>0&&arr2.length>0){
        if(arr1[0]>arr2[0]){
            result.push(arr2.shift());
        }else{
            result.push(arr1.shift());
        }
    }

    if(arr1){
        result = result.concat(arr1);
    }
    if(arr2){
        result = result.concat(arr2);
    }


    return result;

}


var arr1 = [1];
var arr2 = [2,4,6,7];
console.log(mergeArr(arr1,arr2));