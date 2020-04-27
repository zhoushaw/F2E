/**
    1.深浅拷贝区别
    
    a.浅拷贝针对于非引用类型的拷贝不会存在问题
    b.深拷贝如果内容内有引用类型，只做了引用拷贝， 给拷贝后的值引用类型更改会影响原值
 */

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    // 正则、时间等
    function type(val) {
        return typeof val !== 'object'?typeof val : Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
    }
    function isNormalType(val) {
        return typeof val !== 'object' || val === null;
    }

    let vType = type(obj);
    if (vType==='date' || vType==='regexp') return obj;

    var target = vType==='array'?[]:{};

    for(var i in obj) {
        if (isNormalType(obj[i])) {
            target[i] = obj[i];
        }else {
            target[i] = deepCopy(obj[i]);
        }
    }
    return target;
}

var a = {s:'few',v:[{name:'zhou'}],ss:{name:['wfe']}}
var b = deepCopy(a);
b.ss.name[1] = 'zhoushaw';
b.v[0].name = 'chang';
console.log(a,b)