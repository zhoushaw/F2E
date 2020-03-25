//1.闭包：闭包指的是一个函数可以访问它的词法作用域，即使这个函数在它的词法作用域外执行

// closure返回一个函数就形成了闭包，返回的函数能够持续访问它的词法作用域，即使在它的词法作用域外执行
function closure () {
    var name = 'zhoushaw';
    return function () {
        console.log(name);
    }
}
var fn = closure();
fn();

