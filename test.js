
let obj = {
    '0': 0,
    '1': 1,
    '2': 2,
    [Symbol.iterator] () {
        var current = this;
        let index = 0;
        return {
            next: function () {
                if(typeof current[index]!=='undefined'){
                    return {
                        value: current[index++],
                        done: false
                    }
                } else {
                    // index = 0;
                    return {
                        done: true
                    }
                }
            }
        };
    }
};

// for (item of obj) {
//     console.log(item);
// }

// for (item of obj) {
//     console.log(item);
// }

console.log(Array.from(obj))
// function fn(){
//     console.log(arguments);
//     for(item of arguments){
//         console.log(item);
//     }
// }
// fn(12,12,3);