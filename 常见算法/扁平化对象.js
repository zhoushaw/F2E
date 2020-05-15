let obj = {
    "a": {
        "b": {
            "c": {
                "d": 1
            }
        }
    },
    "aa": 2,
    "c": [
        1,
        2
    ]
};

function flatObj (obj){
    Object.keys(obj).forEach((key)=>{
        
    })
}

console.log(flatObj(obj))

//  =>
// { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }


// const sear = (obj, newObj = {}, key) => {
//     if (typeof obj !== 'object' || obj === null) {
//         newObj[key] = obj;
//         return newObj;
//     } else {
//         const isArray = Array.isArray(obj);
//         for (let i in obj) {
//             let useKey = '';
//             if (key) {
//                 if (isArray) {
//                     useKey = key + '[' + i + ']';
//                 } else {
//                     useKey = key + '.' + i;
//                 }
//             } else {
//                 useKey = i;
//             }
//             sear(obj[i], newObj, useKey);
//         }
//         return newObj;
//     }
// }

const sear = function(obj,newObj={},key){
    if(typeof obj !== 'object' || obj ===null) {
        newObj[key] = obj;
        return newObj;
    } else {
        let isArray = Array.isArray(obj);
        let useKey = '';
        for (var i in obj) {
            if (key) {
                if (isArray) {
                    useKey = key + `[${i}]`;
                } else {
                    useKey = key + '.' + i;
                }
            } else {
                useKey = i;
            }
            sear(obj[i],newObj,useKey);
        }
        return newObj;
    }
}

console.log(
    sear(
        {
            "a": {
                "b": {
                    "c": {
                        "d": 1
                    }
                }
            },
            "aa": 2,
            "c": [
                1,
                2
            ]
        }
    )
);