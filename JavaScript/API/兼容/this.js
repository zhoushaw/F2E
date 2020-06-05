/**
    1.this指向

    a.硬绑定：bind、call、apply，如果第一个参数不为null或空，指向指定对象，否则非严格模式下执行window或global
    b.new绑定：指向构造函数
    c.隐式绑定，通过对象间接调用函数，指向调用点
    e.箭头函数指向外层this
    d.默认绑定：默认绑定指向window或global
 */

 