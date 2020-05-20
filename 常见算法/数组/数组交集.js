function intersection(...args) {
    let first = args.shift();
    let arr = args;
    return arr.reduce((pre, next) => {
        pre = new Set(pre);
        next = new Set(next);
        return [...pre].filter((item) => {
            return next.has(item);
        })
    }, first)

}