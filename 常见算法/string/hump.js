
function hump(str){
    var reg = /\_([a-z])/g;
    str = str.replace(reg,(match,m1,index,fullStr)=>{
        console.log(match, index, other, fullStr);
        
        return m1.toUpperCase();
    })
    return str;
}

console.log(hump('abc_d_fss'))