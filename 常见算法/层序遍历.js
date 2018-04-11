
var obj = {
    value:1,
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
        value: 7,
        left: {
            value: 8
        }
    }
}


function print(head){
    if(!head){
        return;
    }
    var queue = [];
    var last = head;
    var nlast = head;
    var i = 0;
    queue.push(head);
    while(queue.length>0){
        var shiftNode = queue.shift();

        console.log(shiftNode.value,i);
        if(shiftNode.left){
            queue.push(shiftNode.left);
            nlast = shiftNode.left;
        }

        if(shiftNode.right){
            queue.push(shiftNode.right);
            nlast = shiftNode.left;
        }

        if(last==shiftNode){
            last = nlast;
            i++;
        }

    }

}

print(obj);
