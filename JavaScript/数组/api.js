// push、pop、shift、unshift、splice、slice、indexOf
// map、reduce、forEach

let result = [1,2,3,4,5].reduce((pre,next)=>{
    if(next<3){
        pre.push(next);
    }
    return pre;
},[])
console.log(result);