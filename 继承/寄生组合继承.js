function Father(){
    this.name = 'hello world';
}

function Child(){
    Father.call(this);
    this.name = 'child'
}

inheritPrototype(Child,Father);

function createdFn(proto){
    function Fn(){}
    var Fn = Object.create(proto);
    return Fn;
}


function inheritPrototype(child,father){
    var prototype = createdFn(father.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

/**
 *
 * 解决了组合继承，两次实例化父类中，子类构造函数中有父类构造函数的方法和属性，子类的原型中有父类原型的属性和方法并且还有父类构造函数的方法和属性
 */