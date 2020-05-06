

var obj = {
    name: 'zhoushaw',
    age: '25'
}

var proxy = new Proxy(obj,{
    get (obj,prop,receiver){
        console.log('get操作');
        
        return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, val,receiver) {
        console.log('set操作');
        return Reflect.set(obj,prop,val,receiver);
    }
})

console.log(proxy.name);
