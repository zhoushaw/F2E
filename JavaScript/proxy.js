let obj = {
    name: 'crap',
    age: {
        n: 1
    }
}
let arr = [1, 2, 3]

function update() {
    console.log('update');
}
let handler = {
    get(target, key) {
        if (typeof target[key] === 'object') {
            return new Proxy(target[key], handler);
        }
        return Reflect.get(target, key);
    },
    set(target, key, val) {
        if (key === 'length') return true;
        update();
        return Reflect.set(target, key, val);
    }
}
// let proxy = new Proxy(arr, handler)

// proxy.push(111); //definProperty不能监控后来增加的属性 vm.$set()
// console.log(arr);

let proxy = new Proxy(obj, handler);
proxy.age.n = 100;
console.log(obj);