function deepCopy(obj){
    let newObj = null;
    // 普通类型直接返回
    if(!isNormalType(obj)){
        return obj;
    }

    if(isNormalType(obj)==='object') {

        newObj = {};
    }else if(isNormalType(obj)==='array') {
        newObj = [];
    }

    for (var i in obj) {
        if (!isNormalType(obj[i])) {
            newObj[i] = obj[i];
        } else {
            newObj[i] = deepCopy(obj[i]);
        }
    }
    return newObj;
    function isNormalType(item){
        var type = Object.prototype.toString.call(item);
        if(type=='[object Array]'){
            return 'array';
        }else if(type=='[object Object]'){
            return 'object';
        }else{
            return false;
        }

    }
}


var obj = [];
var newObj = deepCopy(obj);
console.log(Object.prototype.toString.call(obj));