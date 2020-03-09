/**
 * 1.接收是否深度遍历
 * 2.第一个参数也可以是接收对象
 * 3.将后续所有对象添加至第一个对象
 * 4.
 */

function extend () {
    var deep = false,target,copy,option;
    var i = 1;
    // 确定deep、target值
    if (typeof arguments[0] === 'boolean') {
        deep = arguments[0];
        target = arguments[1] || {};
        i++;
    } else {
        target = arguments[0] || {};
    }

    for (;i<arguments.length;i++) {
        option = arguments[i];
        if (option!==null) {
            for(var i in option) {
                if (deep&option[i]&&(typeof option[i]=='object')) {
                    target[i] = extend(deep,target[i],option[i]);
                } else {
                    target[i] = option[i];
                }
            }
        }
    }

    return target;
}

var result = extend(true,{b: 'fe'},{a:'fe'});

console.log(result);


