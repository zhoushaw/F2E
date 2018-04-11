var obj = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3
        }
    }
}


function reverse(pHead){
    var pre = null;
    var now = pHead;
    while(now){
        var next = now.next;
        now.next = pre;
        pre = now;
        now = next;
    }

    return pre;
}


console.log(reverse(obj));