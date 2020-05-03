const fs = require('fs');


setImmediate(() => {
    console.log('immediate1');
})

setTimeout(() => {
    console.log('timer1');
}, 0)

fs.readFile('./smallFile',()=>{
    setTimeout(()=>{
        console.log('timer2');
    },0)
    setImmediate(()=>{
        console.log('immediate2');
    })
})