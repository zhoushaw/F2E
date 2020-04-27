/*
*  原型继承
* */

function Father(){
    this.obj = {
        name: 'father'
    };
}

function Child(){

}

Child.prototype = new Father();

var child = new Child();
var child2 = new Child();
child.obj.name = 'zhou'
console.log(child.obj);

// new出来的实例，上有一个__proto__属性，这个属性指向它的原型，原型上有constructor指向它的构造函数，通过这种引用关系可以使用到它的方法和属性

/**
 * 优点: 父类的方法和属性都可以使用
 *
 * 缺点:
 * 1.如果父类包含引用类型的属性，所有子类属性都会共享这个属性
 * 2.在新建子类的时候不能像父类传递参数
 *
 */
