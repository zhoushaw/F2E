var a  = {name:'zhou'};

Object.defineProperty(a,'name',{
    value: '1',
    writable: false,
    enumerable: false
})

a.name = 'shou'

for (var i in a) {
    console.log(i)
}


/**
1.属性：value、writable、enumerable、configurable、get、set（fn）
2.value、get不能同时使用
3.writeable：false，set不能同时使用
* */