
let fs = require('fs');

let moduleFn = {
    exports: {},
    require () {},
}


fs.readFile('./bundle3.js',(err,source)=>{
    (new Function('require', 'exports', 'module', source)).call(moduleFn.exports, moduleFn.require, moduleFn.exports, moduleFn);
    console.log(moduleFn);
})

