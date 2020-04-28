
console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    })
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5')
    })
    setTimeout(function () {
        console.log('6')
    })
})

process.nextTick(function () {
    console.log('7');
})
new Promise(function (resolve) {
    console.log('8');
    resolve();
}).then(function () {
    console.log('9')
})

setTimeout(function () {
    console.log('10');
    process.nextTick(function () {
        console.log('11');
        setTimeout(() => {
            console.log('12')
        })
        process.nextTick(function () {
            console.log('13');

        })
    })
    new Promise(function (resolve) {
        console.log('14');
        resolve();
    }).then(function () {
        console.log('15')
    })
})

// nod12版本前：1、8、7、9、2、4、10、14、3、11、13、5、15、6、12
// node12版本后：1、8、7、9、2、4、3、5、10、14、11、13、15、6、12