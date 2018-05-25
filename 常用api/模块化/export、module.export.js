/*
*
*
*
*   使用范围:
*
*   require: node 和 es6 都支持的引入
    export / import : 只有es6 支持的导出引入
    module.exports / exports: 只有 node 支持的导出

    1.从上面可以看出，其实require导出的内容是module.exports的指向的内存块内容，并不是exports的。
    简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。

    export 和 export default
    首先我们讲这两个导出，下面我们讲讲它们的区别

    export与export default均可用于导出常量、函数、文件、模块等
    在一个文件或模块中，export、import可以有多个，export default仅有一个
    通过export方式导出，在导入时要加{ }，export default则不需要
    export能直接导出变量表达式，export default不行。


    注意：
    通过babel编译后，可以es6与node模块的都可以混用




    1.导出方式，module.export = {name:'obj'}
    不可以使用import导入，只可以使用require导入

    2.export 导出方式可以使用,import、require两种方式导入，require导入的是一个对象，所有export出来的方法都在这个对象下
    使用import * as module from ''./module" 将所有导出的模块放到module上
    或者import {name} from './module'
    import {Fn} from './module.js'
    require('./module.js');


    require方法会将对应的模块js，导出一个对象，这个对象下包含了方法



    总结：
    node模块中可以使用: require导入，module.exports 和exports导出，exports是module.exports的引用

* */

const date = {
    name: 'hello'
}

export {date};