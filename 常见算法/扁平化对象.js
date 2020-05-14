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