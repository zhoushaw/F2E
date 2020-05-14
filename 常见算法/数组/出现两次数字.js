

function findTwoTimes (arr){
    let result = [];
    arr.sort((a,b)=>a-b);
    let i = 0;
    while(i<arr.length){
        console.log(arr[i],arr[i+1],arr[i+2]);
        
        if (arr[i] == arr[i + 1] && arr[i + 1]!==arr[i+2]) {
            result.push(arr[i]);
            i += 2;
        } else {
            i++;
        }
    }
    return result;
}

console.log(findTwoTimes([4, 3, 2, 7, 8, 2, 3, 1]));