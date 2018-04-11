var result = [];
function permutation(arr,start){
    if(arr.length-1==start){
        return result.push(arr.join(''));
    }else{
        for(var i=start;i<arr.length;i++){
            swop(arr,i,start);
            permutation(arr,start+1);
            swop(arr,i,start);
        }
    }
}
function swop(arr,i,j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

var arr = ['1','2','3','4'];
permutation(arr,0);

result = [...new Set(result)];

console.log(result);