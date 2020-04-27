

// 不考虑拷贝普通类型
function deepCopy(obj,copy){

    var copy = copy || {};
    for(var i in obj){
        if(typeof obj[i] === 'object'){
            copy = obj[i].constructor == Array?[]:{};
            deepCopy(obj[i],copy);
        }else{
            copy[i] = obj[i];
        }
    }

    return copy;
};