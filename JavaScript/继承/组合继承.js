function Father(){
    this.name = 'father';
}

function Child(){
    Father.call(this);
    this.name = 'child';
}

Child.prototype = new Father();


/**
 * 特点:
 *
 * 由于使用了原型链继承所以，即可继承Father构造函数的方法也可以继承其原型方法
 * 不存在引用属性共享问题
 * 既是父类的实例，也是子类的实例
 * 可以给父类传参
 *
 *
 * 缺点调用了两次父类构造函数，生成了两份实例，第一次是在构造函数内部，第二次在函数原型上，出现了相同属性会覆盖的情况
 */


