//setter(obj, 'a.b.c' ,val)
function setter(target, params, val) {
    let paraArr = params.split('.');
    paraArr.reduce((pre, next, index) => {
        if (index === paraArr.length - 1) {
            pre[next] = val;
        } else {
            if (!pre[next]) pre[next] = {};
        }
        return pre[next];
    }, target)

}