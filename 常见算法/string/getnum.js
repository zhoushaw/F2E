


function trim(str){
    var reg = /^(-|\+)?\d+/;
    let val = str.match(reg)
    var max = Math.pow(2,23)-1;
    var min = -Math.pow(2,23);
    if (val){
        if(val>max) val = max;
        if (val<min) val = min;
    }
    return val || 0;
}


