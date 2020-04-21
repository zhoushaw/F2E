


function uniqList(arr){
    return arr.reduce((pre,val)=>{
        return pre.indexOf(val) === -1 ? [...pre,val] : [...pre];
    },[])
}



console.log(uniqList([1,2,2,2,3,4,5]))