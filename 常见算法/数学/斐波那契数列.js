

function sequess (n){
    if (n == 1 || n==2) {
        return 1;
    }
    return sequess(n-1) + sequess(n-2);
}

console.log(sequess(6));
// 1、1、2、3、5、8

function getNum (n) {
    if (n==1 || n==2) {
        return 1;
    }
    let pre = 1;
    let next = 1;
    while(n>2){
        let temp = next;
        next = next + pre;
        pre = temp;
        n--;
    }
    return pre+next;
}

console.log(sequess(7));
