
var obj = {
    value:'1',
    left:{
        value: 2,
        left: {
            value: 3,
            left: {
                value: 6
            },
            right: {
                value: 9
            }

        },
        right: {
            value: 5
        }
    },
    right: {
        value: 7
    }
}

var result = [];
function print(head){
    if(!head){
        return;
    }
    print(head.left);
    result.push(head.value);
    print(head.right);
}
print(obj)
console.log(result);