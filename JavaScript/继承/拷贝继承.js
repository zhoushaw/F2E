function Father(){
    this.name = 'father';
}

function Child(){
    var father = new Father();
    for(var p in father){
        Child.prototype[p] = father[p];
    }
}

/**
 * 优点:
 * 可以实现多继承
 *
 * 缺点:
 * 效率低，内存占用低
 * 无法获取父类无法枚举的属性
 */