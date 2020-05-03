const fs = require('fs');



setTimeout(() => {
    console.log('timer');
}, 3)

fs.readFile('./bigFile.js', (err, data) => {
    console.log('fs read big file');
})

fs.readFile('./smallFile.js', (err, data) => {
    console.log('fs read small file');
})
