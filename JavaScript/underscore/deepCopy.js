/**
    1.深浅拷贝区别
    
    a.浅拷贝针对于非引用类型的拷贝不会存在问题
    b.深拷贝如果内容内有引用类型，只做了引用拷贝， 给拷贝后的值引用类型更改会影响原值
 */

function deepCopy(obj) {
    var map = new WeakMap();
    function dp(obj) {
        if (isNormalType(obj)) return obj;
        function type(val) {
            return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
        }
        function isNormalType(val) {
            return (typeof obj !== 'object' && typeof obj !== 'function') || val === null;
        }

        var existobj = map.get(obj);

        if(existobj){
            return existobj;
        }


        let vType = type(obj);
        if (vType === 'date' || vType === 'regexp') return obj;

        var target = vType === 'array' ? [] : {};
        map.set(obj,target);

        for (var i in obj) {
            var nType = type(obj[i]);
            if (isNormalType(obj[i])) {
                target[i] = obj[i];
            } else if (nType === 'function') {
                target[i] = eval(obj[i].toString());
            } else if (nType === 'regexp') {
                var reg = obj[i].valueOf();
                target[i] = new RegExp(reg);
            } else if (nType === 'date') {
                target[i] = new Date(obj[i].valueOf());
            } else {
                target[i] = dp(obj[i]);
            }
        }
        return target;

    }
    return dp(obj);
}

var a = {v:[{name:'zhou'}],ss:{name:['wfe']},s: a,d: new Date()}
var b = deepCopy(a);
b.ss.name[1] = 'zhoushaw';
b.v[0].name = 'chang';
console.log(a,b)