

function separator(num){
    var str = String(num);
    let reg = str.indexOf('.') !== -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g
    str = str.replace(reg,(str,m1)=>{
        return m1+','
    });
    return str;
}

console.log(separator(-1000000.02323))
console.log(separator(-1000000))