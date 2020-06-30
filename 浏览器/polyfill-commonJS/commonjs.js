
//node原生的模块，用来读写文件(fileSystem)
let fs = require('fs')
//node原生的模块，用来解析文件路径
let path = require('path')
//提供了一系列 API 用于在 V8 虚拟机环境中编译和运行代码。
let vm = require('vm')
//Module类，就相当于我们的模块(因为node环境不支持es6的class，这里用function)
function Module(p){
  //当前模块的标识
  this.id = p
  //没个模块都有一个exports属性
  this.exports = {}
  //这个模块默认没有加载完
  this.loaded = false
  //模块加载方法
  this.load = function(filepath){
    //判断文件是json还是 node还是js
    let ext = path.extname(filepath)
    return Module._extensions[ext](this)
  }
}
//js文件加载的包装类
Module._wrapper = ['(function(exports,require,module,__dirname,__filename){','\n})']
//所有的加载策略
Module._extensions = {
  '.js': function(module){
    let fn = Module._wrapper[0] + fs.readFileSync(module.id,'utf8') + Module._wrapper[1]
    //执行包装后的方法 把js文件中的导出引入module的exports中
    //模块中的this === module.exports === {}  exports也只是module.exports的别名
    vm.runInThisContext(fn).call(module.exports,module.exports,req,module)
    return module.exports
  },
  '.json': function(module){
    return JSON.parse(fs.readFileSync(module.id,'utf8'))
  },
  '.node': 'xxx',
}
//以绝对路径为key存储一个module
Module._catcheModule = {}
// 解析绝对路径的方法，返回一个绝对路径
Module._resolveFileName = function(moduleId){
  let p = path.resolve(moduleId)
  try{
    fs.accessSync(p)      
    return p
  }catch(e){
    console.log(e)
  }
  //对象中所有的key做成一个数组[]
  let arr = Object.keys(Module._extensions)
  for(let i=0;i<arr.length;i++){
    let file = p+arr[i]
    //因为整个模块读取是个同步过程，所以得用sync，这里判断有没有这个文件存在
    try{
      fs.accessSync(file)      
      return file
    }catch(e){
      console.log(e)
    }
  }
}
//require方法
function req(moduleId){
  let p = Module._resolveFileName(moduleId)
  if(Module._catcheModule[p]){
    //模块已存在
    return Module._catcheModule[p].exports
  }
  //没有缓存就生成一个
  let module = new Module(p)
  Module._catcheModule[p] = module
  //加载模块
  module.exports = module.load(p)
  return module.exports
}


let file = req('./test.js');

console.log(file);