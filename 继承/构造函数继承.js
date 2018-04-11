function Father(){
    this.name = 'father';
    this.say = ()=>{
        console.log(this.obj.name);
    }
}

function Child(){
    Father.call(this);
    this.name = 'hello world';
    console.log(this);

}
new Child();


/**
 * 特点:
 *
 * 1.可以解决原型链继承的父类引用类型
 * 2.创建子类应用时可以向父类传递参数
 *
 *
 * 缺点:
 * 只能继承父类构造函数的方法和属性，不可以继承其原型的方法
 * 无法实现函数复用，每个子类都有父类实力函数的副本，影响性能
 */

