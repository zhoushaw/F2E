/*
*
    1.导出方式，module.export = {name:'obj'}
    不可以使用import导入，只可以使用require导入

    2.export 导出方式可以使用,import、require两种方式导入，require导入的是一个对象，所有export出来的方法都在这个对象下
    使用import * as module from ''./module" 将所有导出的模块放到module上
    或者import {name} from './module'
    import {Fn} from './module.js'
    require('./module.js');


    require方法会将对应的模块js，导出一个对象，这个对象下包含了方法
* */

const date = {
    name: 'hello'
}

export {date};