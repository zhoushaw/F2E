


function instanceOf(left,right){
    while(left){
        if (left.__proto__ === right.prototype) return true;
        left = left.__proto__;
    }
    return false;
}

